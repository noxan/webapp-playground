/*jslint node: true*/
'use strict';

module.exports = function (gulp, plugins, config) {
  return function () {
    return gulp.src(['src/**/*.js', 'gulpfile.js/**/*.js'])
      .pipe(plugins.plumber())
      .pipe(plugins.jslintSimple.run({
        indent: 2
      }))
      .pipe(plugins.jslintSimple.report({
        reporter: require('jshint-stylish').reporter
      }));
  };
};
