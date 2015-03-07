/*global angular:true*/
var app = angular.module('edokiz', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/demo.html'
  }).otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(false);
}]);
