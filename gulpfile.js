var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var transform = require('vinyl-transform');
var browserify = require('browserify');


var browserified = transform(function(filename) {
  var b = browserify(filename);
  return b.bundle();
});

var config = {
  loaders: ['./dist/vendor/angular-loader/angular-loader.js', './dist/vendor/script.js/dist/script.min.js'],
  scripts: ['./src/app.js'],
  templates: ['./src/index.jade'],
  dist: './dist/'
};

gulp.task('templates', function () {
  gulp.src(config.templates)
    .pipe(plugins.plumber())
    .pipe(plugins.jade())
    .pipe(plugins.inject(gulp.src(config.loaders), {
      starttag: '// inject:loaders',
      endtag: '// inject:end',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('scripts', function () {
  gulp.src(config.scripts)
    .pipe(plugins.plumber())
    .pipe(browserified)
    .pipe(gulp.dest(config.dist));
});

gulp.task('serve', function () {
  plugins.connect.server({
    root: config.dist
  });
});


gulp.task('default', ['scripts', 'templates', 'serve']);
