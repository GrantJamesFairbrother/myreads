import React, { useReducer, useEffect } from 'react';
import BookContext from './bookContext';
import BookReducer from './BookReducer';
import {
  DISPLAY_SEARCH,
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
    showSearchPage: false,
    loading: false,
    alert: false
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
  const searchBooks = searchText => {
    setLoading();

    let searchResult = [];
    searchText
      ? BooksAPI.search(searchText).then(async books => {
          !books.error
            ? await books.map(book =>
                BooksAPI.get(book.id).then(book => {
                  searchResult.push(book);
                  dispatch({
                    type: SEARCH_BOOKS,
                    payload: searchResult
                  });
                })
              )
            : dispatch({ type: CLEAR_BOOKS });
        })
      : dispatch({ type: CLEAR_BOOKS });
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

  // Display Search Page
  const toggleSearch = value => {
    dispatch({ type: DISPLAY_SEARCH, payload: value });
  };

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // Clear Search Results
  const clearSearchResults = () => {
    dispatch({ type: CLEAR_BOOKS });
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
        showSearchPage: state.showSearchPage,
        loading: state.loading,
        alert: state.alert,
        searchBooks,
        addBook,
        changeShelf,
        toggleSearch,
        clearSearchResults
      }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
