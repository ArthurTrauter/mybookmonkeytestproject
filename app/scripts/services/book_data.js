bmApp.factory('BookDataService', function() {

  var srv = {};

  srv._books = [
    {
      title: 'JavaScript für Enterprise-Entwickler',
      isbn: '978-3-89864-728-1',
      author: 'Oliver Ochs'
    },
    {
      title: 'Node.js & Co.',
      isbn: '978-3-89864-829-5',
      author: 'Golo Roden'
    },
    {
      title: 'CoffeeScript',
      isbn: '978-3-86490-050-1',
      author: 'Andreas Schubert'
    }
  ];

  // Service implementation
  srv.getBookByIsbn = function(isbn) {
    for (var i = 0, n = srv._books.length; i < n; i++) {
      if (isbn === srv._books[i].isbn) {
        return angular.copy(srv._books[i]);
      }
    }
    return null;
  }

  srv.getBooks = function() {
    // Copy the array in order not to expose
    // the internal data structure
    return angular.copy(srv._books);
  }

  // Public API
  return {
    getBookByIsbn: function(isbn) {
      return srv.getBookByIsbn(isbn);
    },
    getBooks: function() {
      return srv.getBooks();
    }
  };
});
