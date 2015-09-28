describe('<%= appName %>', function() {
  var elem,
      scope;

  beforeEach(module('<%= appName %>'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
  }));

  function compileDirective() {
    var tpl = '<div data-<%= directive %>></div>';

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
