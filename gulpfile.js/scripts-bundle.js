var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var path = require('path');
var transform = require('vinyl-transform');
var watchify = require('watchify');
var config = require('./config');


var bundler = function (options) {
  return transform(function (filename) {
    var b = browserify(filename, options);
    if (config.watch) {
      b = watchify(b);
      b.on('update', bundle.bind(null, filename));
    }
    b.on('bundle', function () {
      plugins.util.log("Script '" + plugins.util.colors.cyan(path.basename(filename)) + "' was browserified.");
    });
    return b.bundle();
  });
};
var bundle = function (filename) {
  return gulp.src(filename)
    .pipe(plugins.plumber())
    .pipe(bundler(watchify.args))
    .pipe(gulp.dest(config.dist));
};

module.exports = bundle;
