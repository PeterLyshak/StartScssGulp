module.exports = function() {
    $.gulp.task('fonts', function() {
        return $.gulp.src('assets/fonts/*/**')
            .pipe($.gulp.dest('build/fonts'))
    });
}
