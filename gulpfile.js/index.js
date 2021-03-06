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


gulp.task('watch', ['set-watch', 'build'], require('./watch')(gulp, plugins, config));


gulp.task('default', ['watch', 'serve']);


gulp.task('jslint', require('./jslint')(gulp, plugins, config));
