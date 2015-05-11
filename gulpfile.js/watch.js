/*jslint node: true*/
'use strict';

module.exports = function (gulp, plugins, config) {
  gulp.task('set-watch', function () {
    config.watch = true;
  });

  return function () {
    // watch other targets (except for scripts with is handled by watchify)
    Object.keys(config.watchFiles).forEach(function (key) {
      gulp.watch(config.watchFiles[key], [key]);
    });
  };
};
