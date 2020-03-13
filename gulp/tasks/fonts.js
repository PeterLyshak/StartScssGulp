const gulp = require('gulp')

module.exports = function fonts() {
  return gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
}


