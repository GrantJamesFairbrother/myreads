import React from 'react';
import ListBooks from './ListBooks';
import { Link } from 'react-router-dom';

const BookShelf = ({ books, displaySearch }) => {
  return (
    <div className='list-books-content'>
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>Currently Reading</h2>
        <ListBooks books={books} shelf={'currentlyReading'} />
      </div>
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>Want to Read</h2>
        <ListBooks books={books} shelf={'wantToRead'} />
      </div>
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>Read</h2>
        <ListBooks books={books} shelf={'read'} />
      </div>
      <Link className='open-search' to='/search'>
        <button onClick={() => displaySearch(true)}>Add a book</button>
      </Link>
    </div>
  );
};

export default BookShelf;
