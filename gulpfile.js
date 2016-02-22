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
      'public/bower/ng-file-upload/ng-file-upload-shim.min.js',
      'public/bower/ng-file-upload/ng-file-upload.min.js',
      'public/bower/angular-ui-sortable/sortable.min.js',
      'public/js/app/app.js',
      'public/js/app/route-config.js',
      'public/js/app/main/main.js',
      'public/js/app/home/home.js',
      'public/js/app/login/login.js',
      'public/js/app/create/create.js',
      'public/js/app/edit-details/edit-details.js',
      'public/js/app/edit/edit.js',
      'public/js/app/scenario/scenario.js',
      'public/js/app/user/user.js',
      'public/js/app/reset/reset.js',
      'public/js/app/settings/settings.js',
      'public/js/app/dashboard/dashboard.js',
      'public/js/app/search/search.js',
      'public/js/app/modal/modal.js',
      'public/js/app/services/requestService.js',
      'public/js/app/services/user-route-service.js',
      'public/js/app/directives/canvas/canvas.js',
      'public/js/app/directives/modal/modal.js',
    ])
    .pipe(sourcemaps.init())
      .pipe(concat('leplanner-min.js'))
      //only uglify if gulp is ran with '--type production'
      // gulp build-js --type production
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/min'));
});
