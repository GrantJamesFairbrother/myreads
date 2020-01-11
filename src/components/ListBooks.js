import React from 'react';
import Books from './Books';
//import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
