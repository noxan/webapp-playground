/*jslint node: true*/
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');
var config = require('./config');


exports.createBundle = function (options) {
  var bundler = browserify({
    entries: options.input,
    extensions: options.extensions,
    debug: true,
    cache: {},
    packageCache: {},
    basedir: config.basedir
  });

  if(config.watch) {
    bundler = watchify(bundler);
  }

  var rebundle = function () {
    bundler.bundle().on('error', function (err) {
      console.log(err.message);
    }).pipe(source(options.output)).pipe(gulp.dest(options.destination)).on('end', function () {
      plugins.util.log("Script '" + plugins.util.colors.cyan(path.basename(options.output)) + "' was browserified.");
    });
  };

  if (config.watch) {
    bundler.on('update', rebundle);
  }

  rebundle();
};
