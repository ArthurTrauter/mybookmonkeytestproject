describe('Directive: tokenfield', function() {

  var $compile,
      $rootScope,
      element,
      scope;

  var testTags = ['Test1', 'Test2', 'Test3'];

  // load the application module
  beforeEach(module('bmApp'));

  // get a reference to all needed AngularJS components
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  // init logic for any test case
  beforeEach(function() {
    scope = $rootScope.$new();

    scope.book = {
      tags: angular.copy(testTags)
    };

    element = $compile('<input tokenfield="book">')(scope);
  });

  it('should propery create available tokens on initialization', function () {
    var tokens = element.parent().find('div.token');

    expect(tokens.length).toBe(testTags.length);
    tokens.each(function(index, token) {
      expect(angular.element(token).data('value')).toEqual(testTags[index]);
    });
  });

  it('should properly add new tokens', function() {
    var tokenCount = element.parent().find('div.token').length,
        tokenInput = element.parent().find('input.token-input'),
        testToken = 'test4';

    tokenInput.focus();
    tokenInput.val(testToken);
    tokenInput.blur();

    var tokenCountAfter = element.parent().find('div.token').length;

    expect(tokenCountAfter).toBe(tokenCount + 1);
    expect(scope.book.tags.length).toBe(tokenCountAfter);
    expect(element.parent().html()).toContain(testToken);
  });

  it('should properly remove new tokens', function() {
    var indexToRemove = 0;

    angular.element(
      element.parent().find('div.token')[indexToRemove]
    ).find('a.close').click();

    expect(element.parent().find('div.token').length
    ).toBe(testTags.length - 1);
    expect(element.parent().html()
    ).not.toContain(testTags[indexToRemove]);
  });
});
