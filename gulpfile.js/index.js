/*jslint node: true*/
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var compression = require('compression');
var es = require('event-stream');
var bundle = require('./scripts-bundle');
var config = require('./config');


gulp.task('scripts', function () {
  return es.concat.apply(null, config.scripts.map(function (filename) {
    return bundle(filename);
  }));
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


gulp.task('jslint', function () {
  return gulp.src(['src/**/*.js', 'gulpfile.js/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.jslintSimple.run({
      indent: 2
    }))
    .pipe(plugins.jslintSimple.report({
      reporter: require('jshint-stylish').reporter
    }));
});
