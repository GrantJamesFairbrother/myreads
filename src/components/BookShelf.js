import React, { useContext } from 'react';
import ListBooks from './ListBooks';
import { Link } from 'react-router-dom';
import BookContext from '../context/bookContext';

const BookShelf = () => {
  const bookContext = useContext(BookContext);

  const { books } = bookContext;

  const shelves = {
    currentlyReading: ['Currently Reading', 'currentlyReading'],
    wantToRead: ['Want to Read', 'wantToRead'],
    read: ['Read', 'read']
  };

  return (
    <div className='list-books-content'>
      {Object.values(shelves).map(shelf => (
        <div key={shelf[1]} className='bookshelf'>
          <h2 className='bookshelf-title'>{shelf[0]}</h2>
          <ListBooks books={books} shelf={shelf[1]} />
        </div>
      ))}
      <Link className='open-search' to='/search'>
        <button>Add a book</button>
      </Link>
    </div>
  );
};

export default BookShelf;
