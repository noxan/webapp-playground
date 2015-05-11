/*jslint node: true*/
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./config');


gulp.task('scripts', require('./scripts')(gulp, plugins, config));
gulp.task('styles', require('./styles')(gulp, plugins, config));
gulp.task('templates', require('./templates')(gulp, plugins, config));
gulp.task('partials', require('./partials')(gulp, plugins, config));

gulp.task('build', ['scripts', 'styles', 'templates', 'partials']);

gulp.task('serve', ['build'], require('./serve')(gulp, plugins, config));


gulp.task('set-watch', function () {
  config.watch = true;
});

gulp.task('watch', ['set-watch', 'build'], function () {
  // watch other targets (except for scripts with is handled by watchify)
  Object.keys(config.watchFiles).forEach(function (key) {
    gulp.watch(config.watchFiles[key], [key]);
  });
});


gulp.task('default', ['watch', 'serve']);


gulp.task('jslint', require('./jslint')(gulp, plugins, config));
