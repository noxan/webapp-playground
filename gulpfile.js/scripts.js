/*jslint node: true*/
'use strict';

var browserify = require('browserify');
var es = require('event-stream');
var path = require('path');
var transform = require('vinyl-transform');
var watchify = require('watchify');


module.exports = function (gulp, plugins, config) {
  function bundler(options) {
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
  }

  function bundle(filename) {
    return gulp.src(filename)
      .pipe(plugins.plumber())
      .pipe(bundler(watchify.args))
      .pipe(gulp.dest(config.dist))
      .pipe(plugins.connect.reload());
  }

  return function () {
    return es.concat.apply(null, config.scripts.map(function (filename) {
      return bundle(filename);
    }));
  };
};
