!function r(e,t,o){function n(u,l){if(!t[u]){if(!e[u]){var a="function"==typeof require&&require;if(!l&&a)return a(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var c=t[u]={exports:{}};e[u][0].call(c.exports,function(r){var t=e[u][1][r];return n(t?t:r)},c,c.exports,r,e,t,o)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)n(o[u]);return n}({1:[function(r,e,t){var o=angular.module("edokiz",["ngRoute"]);o.config(["$routeProvider","$locationProvider",function(r,e){r.when("/",{templateUrl:"partials/hello.html"}).when("/demo",{templateUrl:"partials/demo.html"}).otherwise({redirectTo:"/"}),e.html5Mode(!1)}])},{}]},{},[1]);