bmApp.directive('tokenfield', function(BookDataService) {
  return {
    restrict: 'A',
    scope: {
      // tokenfield holds a two-way bounded
      // reference to the book object
      tokenfield: '='
    },
    link: function(scope, elem) {
      elem.tokenfield({
        autocomplete: {
          source: BookDataService.getTags(),
          delay: 100
        },
        showAutocompleteOnFocus: false,
        allowDuplicates: true,
        createTokensOnBlur: true
      }).on('afterCreateToken', function (e) {
        addToken(e.token.value);
      }).on('removeToken', function (e) {
        removeToken(e.token.value);
      });
    }
  },
})
