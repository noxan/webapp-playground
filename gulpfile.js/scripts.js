var es = require('event-stream');
var bundle = require('./scripts-bundle');


var scriptsTask = function (gulp, plugins, config) {
  return function () {
    return es.concat.apply(null, config.scripts.map(function (filename) {
      return bundle(filename);
    }));
  }
};

module.exports = scriptsTask;
