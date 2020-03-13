const gulp = require('gulp')

global.URL = require('url').URL

const serve = require('./gulp/tasks/serve')
const html = require('./gulp/tasks/html')
const styles = require('./gulp/tasks/styles')
const jsplugins = require('./gulp/tasks/jsplugins')
const script = require('./gulp/tasks/script')
const fonts = require('./gulp/tasks/fonts')
const imageMinify = require('./gulp/tasks/imageMinify')
const clean = require('./gulp/tasks/clean')
const lighthouse = require('./gulp/tasks/lighthouse')
const svgSprite = require('./gulp/tasks/svgSprite')

const dev = gulp.parallel(html, styles, jsplugins, script, fonts, imageMinify, svgSprite)

const build = gulp.series(clean, dev)

module.exports.default = gulp.series(build, serve)
module.exports.build = build

module.exports.lighthouse = gulp.series(lighthouse)
