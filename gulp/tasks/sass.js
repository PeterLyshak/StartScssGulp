module.exports = function() {
    $.gulp.task('sass', function(){
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

        return $.gulp.src('assets/scss/main.scss')
            .pipe($.gp.sass())
            .pipe($.gp.autoprefixer({
                overrideBrowserslist: autoprefixerList
            }))
            .on("error", $.gp.notify.onError({
                message: "Error: <%= error.message %>",
                title: "style"
            }))
            .pipe($.gulp.dest('build/css/'))
            // Минифицированная версия
            .pipe($.gp.sass({outputStyle: 'compressed'}))
            .pipe($.gp.rename('main.min.css'))
            .pipe($.gulp.dest('build/css/'))
            .pipe($.bs.reload({
                stream:true
            }));
    });
}
