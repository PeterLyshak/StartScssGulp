module.exports = function() {
    $.gulp.task('serve', function() {
        $.bs.init({
            server: {
                baseDir: "./build"
            },
			injectChanges: true,
			notify: false
        });
    });
}
