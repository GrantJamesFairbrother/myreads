import React from 'react';
import BookShelfChanger from './BookShelfChanger';

const Book = ({ book }) => {
  const { title, authors, imageLinks } = book;

  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageLinks && imageLinks.thumbnail}")`
            }}></div>
          <BookShelfChanger book={book} />
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-authors'>
          {book.authors &&
            authors.map(author => {
              let count = 1;
              if (count !== authors.length) {
                count++;
                return author + ' ';
              } else return author;
            })}
        </div>
      </div>
    </li>
  );
};

export default Book;
