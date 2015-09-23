describe('<%= _.camelize(props.appName) %>', function() {
  var elem,
      scope;

  beforeEach(module('<%= _.camelize(props.appName) %>'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
  }));

  function compileDirective() {
    var tpl = '<div <%= _.camelize(props.directiveName) %>></div>';

    inject(function($compile) {
      elem = $compile(tpl)(scope);
    });

    scope.$digest();
  };

  describe('initialisation', function() {
    beforeEach(function() {
      compileDirective();
    });

    it('should have a div', function() {
      expect(elem.find('div').length).toEqual(1);
    });
  });
});