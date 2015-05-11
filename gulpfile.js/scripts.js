/*jslint node: true*/
'use strict';

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var es = require('event-stream');
var path = require('path');
var source = require('vinyl-source-stream');
var watchify = require('watchify');


module.exports = function (gulp, plugins, config) {
  function bundle(filename) {
    var bundler = browserify({
      entries: [filename],
      cache: {},
      packageCache: {}
    });

    if (config.watch) {
      bundler = watchify(bundler);
    }

    function build() {
      return bundler.bundle()
        .on('error', function (err) {
          plugins.util.log(plugins.util.colors.red(err.message));
        })
        .pipe(source(path.relative(config.basedir, filename)))
        .pipe(buffer())
        .pipe(plugins.uglify())
        .pipe(plugins.size({showFiles: true}))
        .pipe(gulp.dest(config.dist))
        .pipe(plugins.connect.reload())
        .on('end', function () {
          plugins.util.log("Script '" + plugins.util.colors.cyan(path.basename(filename)) + "' was browserified.");
        });
    }

    if (config.watch) {
      bundler.on('update', build);
    }

    return build();
  }

  return function () {
    return es.concat.apply(null, config.scripts.map(function (filename) {
      return bundle(filename);
    }));
  };
};
