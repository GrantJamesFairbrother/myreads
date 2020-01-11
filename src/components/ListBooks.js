import React from 'react';
import Books from './Books';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListBooks = ({ books, shelf }) => {
  return (
    <div className='bookshelf-books'>
      <ol>
        <TransitionGroup className='books-grid'>
          {books &&
            books
              .filter(book => book.shelf === shelf)
              .map(book => (
                <CSSTransition key={book.id} timeout={500} classNames='item'>
                  <Books book={book} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      </ol>
    </div>
  );
};

export default ListBooks;

ListBooks.propTypes = {
  books: PropTypes.array,
  shelf: PropTypes.string.isRequired
};
