const gulp = require('gulp')

const imageMinify = require('./imageMinify')
const svgSprite = require('./svgSprite')
const styles = require('./styles')
const html = require('./html')
const script = require('./script')
const jsplugins = require('./jsplugins')
const fonts = require('./fonts')

const server = require('browser-sync').create()

module.exports = function serve(cb) {
    server.init({
        server: 'build',
        notify: false,
        open: true,
        cors: true
    })

    gulp.watch('assets/img/**/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify)).on('change', server.reload)
    gulp.watch('assets/fonts/**/*', gulp.series(fonts)).on('change', server.reload)
    gulp.watch('assets/img/svg-icons/*.svg', gulp.series(svgSprite)).on('change', server.reload)
    gulp.watch('assets/scss/**/*.scss', gulp.series(styles, cb => gulp.src('build/css').pipe(server.stream()).on('end', cb)))
    gulp.watch('assets/js/*.js', gulp.series(script)).on('change', server.reload)
    gulp.watch('assets/js/libs/**/*.js', gulp.series(jsplugins)).on('change', server.reload)
    gulp.watch('assets/*.html', gulp.series(html))
    gulp.watch('build/*.html').on('change', server.reload)

    return cb()
}
