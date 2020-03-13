const gulp = require('gulp')
const fileinclude = require('gulp-file-include')
const plumber = require('gulp-plumber')
const htmlValidator = require('gulp-w3c-html-validator')
const bemValidator = require('gulp-html-bem-validator')

module.exports = function html() {
  return gulp.src('assets/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
		prefix: '@@'
		, basepath: '@file'
	}))
    .pipe(bemValidator())
    .pipe(gulp.dest('build'))
}

