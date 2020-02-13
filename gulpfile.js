'use strict';

var autoprefixerList = [
    'Chrome >= 45'
    , 'Firefox ESR'
    , 'Edge >= 12'
    , 'Explorer >= 10'
    , 'iOS >= 9'
    , 'Safari >= 9'
    , 'Android >= 4.4'
    , 'Opera >= 30'
];

var path = {
	build: {
		html: 'build/'
		, js: 'build/js/'
		, css: 'build/css/'
		, img: 'build/img/'
		, fonts: 'build/fonts/'
		, icons: 'assets/fonts/icofont/'
	}
	, src: {
		html: 'assets/*.html'
		, js: 'assets/js/*.js'
		, jsplugins: 'assets/js/libs/**/*.*'
		, style: 'assets/scss/main.scss'
		, img: 'assets/img/**/*.*'
		, fonts: 'assets/fonts/**/*.*'
		, icons: 'assets/img/svg-icons/*.svg'
	}
	, watch: {
		html: 'assets/**/*.html'
		, js: 'assets/js/*.js'
		, jsplugins: 'assets/js/libs/**/*.*'
		, css: 'assets/scss/**/*.scss'
		, img: 'assets/img/**/*.*'
		, fonts: 'assets/fonts/**/*.*'
		, icons: 'assets/img/svg-icons/*.svg'
	}
	, clean: './build/*'
};

var config = {
	open: true,
	injectChanges: true,
	server: {
		baseDir: './build'
	},
	files: [
        './build/css/main.min.css'
    ],
	notify: false
};

var gulp = require('gulp'),
	webserver = require('browser-sync'),
	plumber = require('gulp-plumber'),
	fileinclude = require('gulp-file-include'),
	rigger = require('gulp-rigger'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	jpegrecompress = require('imagemin-jpeg-recompress'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('gulp-rimraf'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	runTimestamp = Math.round(Date.now()/1000),
	fontName = 'ico-font';


gulp.task('iconfont', function(){
	return gulp.src(path.src.icons) // Source folder containing the SVG images
		.pipe(iconfontCss({
			fontName: fontName, // The name that the generated font will have
			path: 'assets/scss/plugins/icons-font-template.scss', // The path to the template that will be used to create the SASS/LESS/CSS file
			targetPath: '../../scss/plugins/icons.scss', // The path where the file will be generated
			fontPath: path.build.icons // The path to the icon font file
		}))
		.pipe(iconfont({
			prependUnicode: false, // Recommended option 
			fontName: fontName, // Name of the font
			formats: ['woff2', 'woff', 'svg'], // The font file formats that will be created
			normalize: true,
			timestamp: runTimestamp // Recommended to get consistent builds when watching files
		}))
		.pipe(gulp.dest(path.build.icons));
});

gulp.task('webserver', function () {
	webserver.init(config);

	webserver.watch('build/').on('change', webserver.reload);
});


gulp.task('html:build', function () {
	return gulp.src(path.src.html)
		.pipe(plumber())
		.pipe(fileinclude({
			prefix: '@@'
			, basepath: '@file'
		}))
		.pipe(gulp.dest(path.build.html));
});



gulp.task('css:build', function () {
	return gulp.src(path.src.style)
		.pipe(sass({
			noCache: true
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: autoprefixerList
		}))
		.pipe(gulp.dest(path.build.css))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest(path.build.css))
		.pipe(webserver.reload({stream: true}));
  
  done()
});

gulp.task('watch:css', function() {
    return gulp.watch(path.watch.css, gulp.series('css:build'));
});



gulp.task('jsplugins:build', function () {
    return gulp.src(path.src.jsplugins)
		.pipe(concat('scripts.js'))
        .pipe(rename('plugins.min.js'))
		.pipe(uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(gulp.dest(path.build.js));
});


gulp.task('js:build', function () {
	return gulp.src(path.src.js)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js));
});

gulp.task('fonts:build', function () {
	return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task('image:build', function () {
	return gulp.src(path.src.img)
		.pipe(cache(imagemin([
            imagemin.gifsicle({
				interlaced: true
			})
            , jpegrecompress({
				progressive: true
				, max: 90
				, min: 80
			})
            , pngquant()
        ]))).pipe(gulp.dest(path.build.img));
});

gulp.task('clean:build', function () {
	return gulp.src(path.clean, {
		read: false
	}).pipe(rimraf());
});

gulp.task('cache:clear', function () {
	cache.clearAll();
});

gulp.task('build', gulp.series('clean:build', gulp.parallel('html:build', 'css:build', 'js:build', 'jsplugins:build', 'fonts:build', 'image:build')));


gulp.task('watch', function () {
	gulp.watch(path.watch.html, gulp.series('html:build')).on('change', webserver.reload);
	gulp.watch(path.watch.js, gulp.series('js:build')).on('change', webserver.reload);
	gulp.watch(path.watch.jsplugins, gulp.series('jsplugins:build')).on('change', webserver.reload);
	gulp.watch(path.watch.img, gulp.series('image:build')).on('change', webserver.reload);
	gulp.watch(path.watch.fonts, gulp.series('fonts:build')).on('change', webserver.reload);
	gulp.watch(path.watch.icons, gulp.series('iconfont')).on('change', webserver.reload);
});

gulp.task('default', gulp.series(gulp.parallel('watch', 'watch:css', 'webserver')));
