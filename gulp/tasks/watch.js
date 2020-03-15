module.exports = function() {
    $.gulp.task('watch',function(){
        $.gulp.watch('assets/**/*.html',$.gulp.series('html'));
        $.gulp.watch('assets/scss/**/*.scss',$.gulp.series('sass'));
        $.gulp.watch('assets/js/*.js',$.gulp.series('scripts'));
        $.gulp.watch('assets/js/libs/**/*.js',$.gulp.series('scripts:lib'));
        $.gulp.watch('assets/img/**/*',$.gulp.series('img'));
        $.gulp.watch('assets/fonts/**/*',$.gulp.series('fonts'));
        $.gulp.watch('assets/img/svg-icons/**/*.svg',$.gulp.series('svg'));
    });
}
