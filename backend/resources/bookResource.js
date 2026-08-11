const bookResource = (book) => {
  return {
    id: book.id,
    title: book.title,
    description: book.description,
    publishingDate: book.publishingDate,
    authors: book.Authors,
  };
};

const bookCollection = (books) => {
  return books.map(bookResource);
};

module.exports = { bookResource, bookCollection };
