/*jslint node: true*/
'use strict';

var compression = require('compression');


module.exports = function (gulp, plugins, config) {
  return function () {
    plugins.connect.server({
      root: config.dist,
      middleware: function () {
        return [compression()];
      }
    });
  };
};
