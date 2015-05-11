/*jslint node: true*/
'use strict';

module.exports = function (gulp, plugins, config) {
  return function () {
    return gulp.src(config.styles)
      .pipe(plugins.plumber())
      .pipe(plugins.stylus())
      .pipe(plugins.minifyCss())
      .pipe(plugins.size({showFiles: true}))
      .pipe(gulp.dest(config.dist));
  };
};
