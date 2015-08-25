(function(window, angular, undefined) {
    'use strict';

    angular.module('<%= componentName %>.provider', [])
        .provider('<%= providerName %>', [
            function() {
                var defaults = {};

                this.configure = function(config) {
                    angular.extend(defaults, config);
                };

                this.$get = ['$injector', function($injector) {
                    var rScope = $injector.get('$rootScope');

                    return {
                        settings: defaults
                    };
                }];
            }
        ]);

})(window, window.angular);

(function(window, angular, undefined) {
    'use strict';

    angular.module('<%= componentName %>.directives', ['<%= componentName %>.provider'])
        .directive('<%= directiveName %>', ['<%= providerName %>', '$http', function(<%= providerName %>, $http) {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {},
                template: '',
                compile: function(tElem, tAttrs) {
                    if (tAttrs.template) {
                        var template = $templateCache.get(tAttrs.template);
                        if (template) {
                            tElem.replaceWith(template);
                        } else {
                            $log.warn('<%= componentName %>: Provided template could not be loaded. ' +
                                'Please be sure that it is populated before the <toast> element is represented.');
                        }
                    }

                    return function(scope, ele, attrs) {
                        scope.someOption = undefined;
                        scope.someFunction = function() {

                        };
                    };
                },

                controller: ['$scope', function($scope) {
                    this.scope = $scope;
                }]
            }
        }]);

})(window, window.angular);

(function(window, angular, undefined) {
    'use strict';

    angular
        .module('<%= componentName %>', [
            '<%= componentName %>.directives',
            '<%= componentName %>.provider'
        ]);

})(window, window.angular);
