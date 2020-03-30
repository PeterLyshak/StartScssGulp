module.exports = function() {
    
    // Обработка файлов библиотек и перенос в build в исходном виде
    $.gulp.task('scripts:lib', function() {
        return $.gulp.src('assets/js/libs/**/*')
            .pipe($.gp.concat('plugins.min.js'))
            .pipe($.gp.uglify({
                output: {
                    'ascii_only': true
                }
            }))
            .pipe($.gulp.dest('build/js/'))
            .pipe($.bs.reload({
                stream: true
            }));
    });

    $.gulp.task('scripts', function() {
        return $.gulp.src('assets/js/*.js')
            .pipe($.gp.uglify({
                output: {
                    'ascii_only': true
                }
            }))
            .pipe($.gp.rename({ suffix: '.min' }))
            .pipe($.gulp.dest('build/js/'))
            .pipe($.bs.reload({
                stream: true
            }));
    });

};
