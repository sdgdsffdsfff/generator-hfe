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

  var component = angular.module('<%= _.camelize(props.appName) %>', []);

  component.run(["$templateCache", function($templateCache) {
    $templateCache.put("templates/component.html", "templateCache component");
  }]);

  component.directive('<%= _.camelize(props.directiveName) %>', ['$compile', function($compile) {
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      templateUrl: 'templates/component.html',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function(scope, iElm, iAttrs, controller) {

      }
    };
  }]);

  return '<%= _.camelize(props.appName) %>';
}));
