(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['angular'], function(angular) {
      return factory(angular);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular'));
  } else {
    factory(angular);
  }
}(function(angular) {
  'use strict';
  
  angular.module('<%= _.camelize(props.appName) %>', [])
    .service('<%= _.camelize(props.appName) %>', function() {
      this.runtimeObj = 'Alo';
    });
}));
