/*global require: true, angular: true, document: true*/
(function () {
  'use strict';

  var Spinner = require('../dist/vendor/spin.js/spin.js');
  var spinner = new Spinner().spin(document.body);

  var $css = function (cssList) {
    cssList.forEach(function (cssHref) {
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = cssHref;
      var h = document.getElementsByTagName('head')[0];
      h.parentNode.insertBefore(l, h);
    });
  };

  require('../dist/vendor/angular-loader/angular-loader.js');

  var $script = require('../dist/vendor/script.js/dist/script.min.js');
  $script([
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js',
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular-route.min.js',
    'app.js'
  ], function () {
    spinner.stop();
    angular.bootstrap(document, ['edokiz']);
  });
  $css(['styles.css']);
}());
