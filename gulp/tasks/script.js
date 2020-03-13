const gulp = require('gulp')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const rename = require('gulp-rename')
const concat = require('gulp-concat')

module.exports = function script() {
  return gulp.src('assets/js/*.js')
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'))
}

