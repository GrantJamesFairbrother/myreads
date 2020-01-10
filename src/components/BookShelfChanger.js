import React, { useContext, useEffect } from 'react';
import BookContext from '../context/bookContext';
import { update } from '../BooksAPI';

const BookShelfChanger = ({ book }) => {
  const bookContext = useContext(BookContext);

  const { changeShelf, removeBook, addBook } = bookContext;
  const { id, shelf } = book;

  useEffect(() => {
    async function updateShelf() {
      shelf &&
        (await update(book, shelf).then(shelves => {
          console.log(shelves);
        }));
    }
    updateShelf();
  });

  return (
    <div className='book-shelf-changer'>
      <select
        defaultValue={shelf ? shelf : 'none'}
        onChange={event => {
          event.target.value === 'remove'
            ? removeBook(id)
            : shelf
            ? changeShelf(event, id)
            : addBook(event, book);
        }}>
        <option value='move' disabled>
          Move to...
        </option>
        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>
        <option value='none'>None</option>
        {shelf && <option value='remove'>Remove From Library</option>}
      </select>
    </div>
  );
};

export default BookShelfChanger;
