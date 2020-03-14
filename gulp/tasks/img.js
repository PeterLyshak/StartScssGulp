module.exports = function() {
    $.gulp.task('img', function() {
        return $.gulp.src('assets/img/**/*.{png,jpg,gif,svg}')
        	.pipe($.gp.imagemin([
		      $.gp.imagemin.gifsicle({ interlaced: true }),
		      $.gp.imagemin.mozjpeg({
		        quality: 75,
		        progressive: true
		      }),
		      $.gp.imagemin.optipng({ optimizationLevel: 5 }),
		      $.gp.imagemin.svgo({
		        plugins: [
		          { removeViewBox: true },
		          { cleanupIDs: false }
		        ]
		      })
		    ]))
            .pipe($.gulp.dest('build/img'))
    });
}
