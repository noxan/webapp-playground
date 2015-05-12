/*global require: true, angular: true, document: true*/
(function () {
  'use strict';

  var Spinner = require('../dist/vendor/spin.js/spin.js');
  var spinner = new Spinner().spin(document.body);

  var $css = function (cssList) {
    var head = document.getElementsByTagName('head')[0];
    cssList.forEach(function (cssHref) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssHref;
      link.media = 'only x';
      head.parentNode.insertBefore(link, head);

      setTimeout(function () {
        link.media = "all";
      });
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
