import React, { useReducer, useEffect } from 'react';
import BookContext from './bookContext';
import BookReducer from './BookReducer';
import {
  GET_ALL_BOOKS,
  CHANGE_SHELF,
  SEARCH_BOOKS,
  CLEAR_BOOKS,
  ADD_BOOK,
  SET_LOADING,
  SHOW_ALERT,
  REMOVE_ALERT
} from './types';
import * as BooksAPI from '../BooksAPI';

const BookState = props => {
  const initialState = {
    books: null,
    selectedBook: null,
    searchResult: null,
    loading: false,
    alert: false,
    noResults: false
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  // Get All Books
  useEffect(() => {
    setLoading();

    BooksAPI.getAll().then(books => {
      dispatch({ type: GET_ALL_BOOKS, payload: books });
    });
  }, []);

  // Search for Books
  const searchBooks = async (searchText, books) => {
    setLoading();

    if (searchText) {
      const res = await BooksAPI.search(searchText);

      if (!res.error) {
        res.map(searchBook => {
          books.forEach(bookshelfBook => {
            if (searchBook.id === bookshelfBook.id) {
              searchBook.shelf = bookshelfBook.shelf;
            }
          });
          return searchBook;
        });
        dispatch({ type: SEARCH_BOOKS, payload: res });
      } else {
        dispatch({ type: CLEAR_BOOKS });
      }
    } else dispatch({ type: CLEAR_BOOKS, payload: searchText });
  };

  // Add Book to Book Shelf
  const addBook = (event, book) => {
    dispatch({
      type: ADD_BOOK,
      payload: { shelf: event.target.value, book: book }
    });

    showAlert();
  };

  // Update API Bookshelf
  useEffect(() => {
    function updateShelf() {
      state.selectedBook &&
        BooksAPI.update(state.selectedBook, state.selectedBook.shelf);
    }
    updateShelf();
  });

  // Change Shelf
  const changeShelf = (event, book) => {
    dispatch({
      type: CHANGE_SHELF,
      payload: { shelf: event.target.value, book: book }
    });
  };

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // Clear Search Results
  const clearSearchResults = (searchText = '') => {
    dispatch({ type: CLEAR_BOOKS, payload: searchText });
  };

  // Show Alert
  const showAlert = () => {
    dispatch({ type: SHOW_ALERT });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 3000);
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        selectedBook: state.selectedBook,
        searchResult: state.searchResult,
        loading: state.loading,
        alert: state.alert,
        noResults: state.noResults,
        searchBooks,
        addBook,
        changeShelf,
        clearSearchResults
      }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
