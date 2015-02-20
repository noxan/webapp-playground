var $loader = require('../dist/vendor/angular-loader/angular-loader.js');
var $script = require('../dist/vendor/script.js/dist/script.min.js');

$script([
  'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js',
  'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular-route.min.js',
  'app.js'
], function () {
  angular.bootstrap(document, ['edokiz']);
});
