var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat')

gulp.task('build-dist', function() {
  return gulp.src('src/**/*.js')
    .pipe(concat('ng-core.js'))
    .pipe(gulp.dest('dist'));
});

// NOTE: Uglify doesn't work with ES6 :(
// gulp.task('build-dist-min', function() {
//   return gulp.src('src/**/*.js')
//     .pipe(uglify())
//     .pipe(concat('rdelhommer-angularjs-utils.min.js'))
//     .pipe(gulp.dest('dist'));
// });