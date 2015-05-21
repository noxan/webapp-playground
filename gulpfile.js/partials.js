/*jslint node: true*/
'use strict';

module.exports = function (gulp, plugins, config) {
  return function () {
    return gulp.src(config.partials, {base: config.basedir})
      .pipe(plugins.plumber())
      .pipe(plugins.jade())
      .pipe(plugins.minifyHtml())
      .pipe(plugins.size({showFiles: true}))
      .pipe(gulp.dest(config.dist))
      .pipe(plugins.connect.reload());
  };
};
