import React, { useContext } from 'react';
import BookContext from '../context/bookContext';

const BookShelfChanger = ({ book }) => {
  const bookContext = useContext(BookContext);

  const { changeShelf, removeBook } = bookContext;

  return (
    <div className='book-shelf-changer'>
      <select
        defaultValue={book.shelf}
        onChange={event => {
          event.target.value === 'remove'
            ? removeBook(book.id)
            : changeShelf(event, book.id);
        }}>
        <option value='move' disabled>
          Move to...
        </option>
        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>
        <option value='remove'>Remove From Library</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
