import React, { useReducer, useEffect } from 'react';
import BookContext from './bookContext';
import BookReducer from './BookReducer';
import {
  DISPLAY_SEARCH,
  GET_ALL_BOOKS,
  CHANGE_SHELF,
  REMOVE_BOOK,
  SEARCH_BOOKS,
  CLEAR_BOOKS,
  ADD_BOOK,
  GET_BOOKSHELF_DATA
} from './types';
import * as BooksAPI from '../BooksAPI';

const BookState = props => {
  const initialState = {
    books: null,
    selectedBook: null,
    searchResult: null,
    bookShelfBooks: null,
    showSearchPage: false,
    loading: false
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  //useEffect(() => console.log(state.books));
  useEffect(() => console.log(state.searchResult));

  // Get All Books
  useEffect(() => {
    BooksAPI.getAll().then(books => {
      dispatch({ type: GET_ALL_BOOKS, payload: books });
    });
  }, []);

  // Search for Books
  const searchBooks = text => {
    text
      ? BooksAPI.search(text).then(books => {
          dispatch({ type: SEARCH_BOOKS, payload: books });
        })
      : dispatch({ type: CLEAR_BOOKS });
  };

  // Add Book to Book Shelf
  const addBook = (event, book) => {
    dispatch({
      type: ADD_BOOK,
      payload: { shelf: event.target.value, book: book }
    });
  };

  // Update API Book Shelf
  useEffect(() => {
    async function updateShelf() {
      state.selectedBook &&
        (await BooksAPI.update(
          state.selectedBook,
          state.selectedBook.shelf
        ).then(bookShelfData => {
          dispatch({ type: GET_BOOKSHELF_DATA, payload: bookShelfData });
        }));
    }
    updateShelf();
  });

  // Display Search
  const displaySearch = value => {
    dispatch({ type: DISPLAY_SEARCH, payload: value });
  };

  // Change Shelf
  const changeShelf = (event, book) => {
    dispatch({
      type: CHANGE_SHELF,
      payload: { shelf: event.target.value, book: book }
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
        selectedBook: state.selectedBook,
        searchResult: state.searchResult,
        bookShelfBooks: state.bookShelfBooks,
        showSearchPage: state.showSearchPage,
        loading: state.loading,
        searchBooks,
        addBook,
        displaySearch,
        changeShelf,
        removeBook
      }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
