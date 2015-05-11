/*jslint node: true*/
'use strict';

module.exports = function (gulp, plugins, config) {
  return function () {
    return gulp.src(config.templates)
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
      .pipe(gulp.dest(config.dist))
      .pipe(plugins.connect.reload());
  };
};
