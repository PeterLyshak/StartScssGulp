module.exports = function() {
	var imageminPngquant = require('imagemin-pngquant');
	var imageminZopfli = require('imagemin-zopfli');
	var imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
	var imageminGiflossy = require('imagemin-giflossy');

    $.gulp.task('img', function() {
        return $.gulp.src('assets/img/**/*.{png,jpg,gif,svg}')
            .pipe($.gp.cache($.gp.imagemin([
	            //png
	            imageminPngquant({
	                speed: 1,
	                quality: [0.95, 1] //lossy settings
	            }),
	            imageminZopfli({
	                more: true
	                // iterations: 50 // very slow but more effective
	            }),
	            //gif
	            // imagemin.gifsicle({
	            //     interlaced: true,
	            //     optimizationLevel: 3
	            // }),
	            //gif very light lossy, use only one of gifsicle or Giflossy
	            imageminGiflossy({
	                optimizationLevel: 3,
	                optimize: 3, //keep-empty: Preserve empty transparent frames
	                lossy: 2
	            }),
	            //svg
	            $.gp.imagemin.svgo({
	                plugins: [{
	                    removeViewBox: false
	                }]
	            }),
	            
	            //jpg very light lossy, use vs jpegtran
	            imageminMozjpeg({
	                quality: 90,
	                progressive: true
	            })
	        ])))
	        .pipe($.gulp.dest('build/img'));
    });
}
