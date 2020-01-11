import React, { useContext } from 'react';
import BookContext from '../context/bookContext';

const BookShelfChanger = ({ book }) => {
  const bookContext = useContext(BookContext);

  const { changeShelf, addBook } = bookContext;
  const { shelf } = book;

  return (
    <div className='book-shelf-changer'>
      <select
        defaultValue={shelf ? shelf : 'none'}
        onChange={event => {
          shelf !== 'none' ? changeShelf(event, book) : addBook(event, book);
        }}>
        <option value='move' disabled>
          Move to...
        </option>
        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>
        <option value='none'>None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
