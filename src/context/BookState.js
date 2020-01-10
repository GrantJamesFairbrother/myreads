import React, { useReducer, useEffect } from 'react';
import BookContext from './bookContext';
import BookReducer from './BookReducer';
import {
  DISPLAY_SEARCH,
  GET_ALL_BOOKS,
  CHANGE_SHELF,
  REMOVE_BOOK,
  SEARCH_BOOKS,
  CLEAR_BOOKS
} from './types';
import * as BooksAPI from '../BooksAPI';

const BookState = props => {
  const initialState = {
    books: [],
    searchResult: null,
    showSearchPage: false,
    loading: false
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  useEffect(() => console.log(state.books));

  // Get All Books
  useEffect(() => {
    BooksAPI.getAll().then(books => {
      dispatch({ type: GET_ALL_BOOKS, payload: books });
    });
  }, []);

  // Search for Books
  const searchBooks = async text => {
    text
      ? BooksAPI.search(text).then(books => {
          dispatch({ type: SEARCH_BOOKS, payload: books });
        })
      : dispatch({ type: CLEAR_BOOKS });
  };

  // Display Search
  const displaySearch = value => {
    dispatch({ type: DISPLAY_SEARCH, payload: value });
  };

  // Change Shelf
  const changeShelf = (event, id) => {
    console.log(event.target.value);
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
        searchResult: state.searchResult,
        showSearchPage: state.showSearchPage,
        loading: state.loading,
        searchBooks,
        displaySearch,
        changeShelf,
        removeBook
      }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
