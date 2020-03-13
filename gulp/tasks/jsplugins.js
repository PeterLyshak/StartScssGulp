const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

module.exports = function jsplugins() {
  return gulp.src('assets/js/libs/**/*.js')
    .pipe(concat('plugins.min.js'))
    .pipe(uglify({
        output: {
            'ascii_only': true
        }
    }))
    .pipe(gulp.dest('build/js'))
}

