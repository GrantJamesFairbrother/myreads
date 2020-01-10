import React from 'react';
import Books from './Books';

const ListBooks = ({ books, shelf }) => {
  return (
    <div className='bookshelf-books'>
      <ol className='books-grid'>
        {books &&
          books
            .filter(book => book.shelf === shelf)
            .map(book => <Books book={book} key={book.id} />)}
      </ol>
    </div>
  );
};

export default ListBooks;
