import React, { useReducer } from 'react';
import BookContext from './bookContext';
import BookReducer from './BookReducer';
import { GET_BOOKS, DISPLAY_SEARCH } from './types';

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

  // Get Books
  const getBooks = books => {
    dispatch({ type: GET_BOOKS, payload: books });
  };

  // Display Search
  const displaySearch = value => {
    dispatch({ type: DISPLAY_SEARCH, payload: value });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        showSearchPage: state.showSearchPage,
        getBooks,
        displaySearch
      }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
