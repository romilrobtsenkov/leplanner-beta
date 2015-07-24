/* File: gulpfile.js */

// grab our gulp packages
var gulp   = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src('public/js/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('public/js/app/**/*.js', ['jshint']);
});

gulp.task('build-js', function() {
  return gulp.src([
      'public/bower/angular/angular.min.js',
      'public/bower/angular-route/angular-route.min.js',
      'public/bower/angular-resource/angular-resource.min.js',
      'public/bower/lodash/dist/lodash.min.js',
      'public/bower/angularjs-dropdown-multiselect/dist/angularjs-dropdown-multiselect.min.js',
      'public/bower/angular-utils-pagination/dirPagination.js',
      'public/js/app/app.js',
      'public/js/app/route-config.js',
      'public/js/app/**/*.js'
    ])
    .pipe(sourcemaps.init())
      .pipe(concat('leplanner-min.js'))
      //only uglify if gulp is ran with '--type production'
      // gulp build-js --type production
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/min'));
});
