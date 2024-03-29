'use strict';

describe('Service: BookDataService', function() {

  var BookDataService;

  // load the application module
  beforeEach(module("bmApp"));

  // get a reference to the service
  beforeEach(inject(function (_BookDataService_) {
    BookDataService = _BookDataService_;
  }));

  describe('Public API', function() {
    it('should include a getBookByIsbn() function', function() {
      expect(BookDataService.getBookByIsbn).toBeDefined();
    });

    it('should include a getBooks() function', function() {
      expect(BookDataService.getBooks).toBeDefined();
    });

    it('should include a storeBook() function', function() {
      expect(BookDataService.storeBook).toBeDefined();
    });

    it('should include a updateBook() function', function() {
      expect(BookDataService.updateBook).toBeDefined();
    });

    it('should include a deleteBookByIsbn() function', function() {
      expect(BookDataService.deleteBookByIsbn).toBeDefined();
    });

    it('should include a getTags() function', function() {
      expect(BookDataService.getTags).toBeDefined();
    });
  });

  describe('Public API usage', function() {
    describe('getBookByIsbn()', function() {
      it('should return the proper book object (valid isbn)',
      function() {
        var isbn = '978-3-86490-050-1',
            book = BookDataService.getBookByIsbn(isbn);
        expect(book.title).toBe('CoffeeScript');
      });

      it('should return null (invalid isbn)',
      function() {
        var isbn = 'test',
            book = BookDataService.getBookByIsbn(isbn);
        expect(book).toBeNull();
      });
    });

    describe('getBooks()', function() {
      it('should return a proper array of book object',
      function() {
        var books = BookDataService.getBooks();
        expect(books.length).toBe(3);
      });
    });

    describe('storeBook()', function() {
      it('should properly store the passed book object', function() {
        var beforeCount = BookDataService.getBooks().length;

        // store an example book
        var book = storeExampleBook();

        expect(BookDataService.getBooks().length).toBe(beforeCount + 1);
        expect(BookDataService.getBookByIsbn(book.isbn)).not.toBeNull();
      });
    });

    describe('updateBook()', function() {
      it('should properly update the book object', function() {
        // store an example book
        var book = storeExampleBook();

        // change it
        book.abstract = 'TEST';

        // update the example book
        BookDataService.updateBook(book);

        expect(BookDataService.getBookByIsbn(book.isbn).abstract)
        .toBe(book.abstract);
      });
    });

    describe('deleteBookByIsbn()', function() {
      it('should propery delete the book object with the passed isbn', function() {
        // store an example book
        var book = storeExampleBook();

        // delete the example book
        BookDataService.deleteBookByIsbn(book.isbn);

        expect(BookDataService.getBookByIsbn(book.isbn)).toBeNull();
      });
    });

    describe('getTags()', function() {
      it('should return a proper array of tags',
      function() {
        var tags = BookDataService.getTags();
        expect(tags.length).toBe(8);
      });
    });

  });

  // Helper function
  var storeExampleBook = function() {
    var isbn = '978-3-86490-127-0',
        book = {
          title : 'JavaScript effektiv',
          subtitle : '68 Dinge, die ein guter JavaScript-Entwickler wissen sollte',
          isbn : isbn,
          abstract : 'Wollen Sie JavaScript wirklich beherrschen?',
          numPages : 240,
          author : 'David Herman',
          publisher : {
            name : 'dpunkt.verlag',
            url  : 'http://dpunkt.de'
          },
          tags: [
            'javascript', 'enterprise', 'nodejs', 'web', 'browser'
          ]
        };

    BookDataService.storeBook(book);

    return book;
  };

});
