var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var transform = require('vinyl-transform');
var browserify = require('browserify');


var browserified = transform(function(filename) {
  var b = browserify(filename);
  return b.bundle();
});

var config = {
  scripts: ['./src/app.js'],
  templates: ['./src/index.jade'],
  dist: './dist/'
};

gulp.task('templates', function () {
  gulp.src(config.templates)
    .pipe(plugins.plumber())
    .pipe(plugins.jade())
    .pipe(gulp.dest(config.dist));
});

gulp.task('scripts', function () {
  gulp.src(config.scripts)
    .pipe(plugins.plumber())
    .pipe(browserified)
    .pipe(gulp.dest(config.dist));
});


gulp.task('default', ['scripts']);
