/*jslint node: true*/
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var compression = require('compression');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var path = require('path');

var config = require('./config');


var createBundle = function (options) {
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

gulp.task('set-watch', function () {
  config.watch = true;
});

gulp.task('scripts', function () {
  config.scripts.forEach(function (bundle) {
    createBundle({
      input: bundle,
      output: bundle,
      destination: config.dist,
      extensions: ['.js']
    });
  });
});

gulp.task('styles', function () {
  return gulp.src(config.styles)
    .pipe(plugins.plumber())
    .pipe(plugins.stylus())
    .pipe(plugins.minifyCss())
    .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(config.dist));
});

gulp.task('templates', function () {
  gulp.src(config.templates)
    .pipe(plugins.plumber())
    .pipe(plugins.jade())
    .pipe(plugins.inject(gulp.src(config.loaders), {
      starttag: '// inject:loaders',
      endtag: '// inject:end',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8');
      }
    }))
    .pipe(plugins.minifyHtml())
    .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(config.dist));
});

gulp.task('partials', function () {
  gulp.src(config.partials, {base: './src/'})
    .pipe(plugins.plumber())
    .pipe(plugins.jade())
    .pipe(plugins.minifyHtml())
    .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(config.dist));
});

gulp.task('build', ['scripts', 'styles', 'templates', 'partials']);

gulp.task('serve', ['build'], function () {
  plugins.connect.server({
    root: config.dist,
    middleware: function(connect, opt) {
      return [compression()];
    }
  });
});

gulp.task('watch', ['set-watch', 'build']);

gulp.task('default', ['watch', 'serve']);


gulp.task('jslint', function () {
  return gulp.src(['./src/**/*.js', 'gulpfile.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.jslintSimple.run({
      indent: 2
    }))
    .pipe(plugins.jslintSimple.report({
      reporter: require('jshint-stylish').reporter
    }));
});
