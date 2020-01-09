import React, { useReducer, useEffect } from 'react';
import BookContext from './bookContext';
import BookReducer from './BookReducer';
import {
  DISPLAY_SEARCH,
  GET_ALL_BOOKS,
  CHANGE_SHELF,
  REMOVE_BOOK
} from './types';
import * as BooksAPI from '../BooksAPI';

const BookState = props => {
  const initialState = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  useEffect(() => console.log(state.books));

  // Get All Books
  useEffect(() => {
    BooksAPI.getAll().then(books => {
      dispatch({ type: GET_ALL_BOOKS, payload: books });
    });
  }, []);

  // Display Search
  const displaySearch = value => {
    dispatch({ type: DISPLAY_SEARCH, payload: value });
  };

  // Change Shelf
  const changeShelf = (event, id) => {
    dispatch({
      type: CHANGE_SHELF,
      payload: { shelf: event.target.value, id: id }
    });
  };

  // Remove Book
  const removeBook = id => {
    dispatch({ type: REMOVE_BOOK, payload: id });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        showSearchPage: state.showSearchPage,
        displaySearch,
        changeShelf,
        removeBook
      }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;

// books: [
//     {
//       id: 1,
//       title: 'To Kill a Mockingbird',
//       author: 'Harper Lee',
//       position: 1,
//       url:
//         'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
//     },
//     {
//       id: 2,
//       title: "Harry Potter and the Sorcerer's Stone",
//       author: 'J.K. Rowling',
//       position: 2,
//       url:
//         'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api'
//     },
//     {
//       id: 3,
//       title: 'The Hobbit',
//       author: 'J.R.R. Tolkien',
//       position: 3,
//       url:
//         'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'
//     }
//   ]
