import React, { useReducer, useEffect } from 'react';
import BookContext from './bookContext';
import BookReducer from './BookReducer';
import {
  DISPLAY_SEARCH,
  GET_ALL_BOOKS,
  CHANGE_SHELF,
  SEARCH_BOOKS,
  CLEAR_BOOKS,
  ADD_BOOK
} from './types';
import * as BooksAPI from '../BooksAPI';

const BookState = props => {
  const initialState = {
    books: null,
    selectedBook: null,
    searchResult: null,
    showSearchPage: false,
    loading: false
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  // Get All Books
  useEffect(() => {
    BooksAPI.getAll().then(books => {
      dispatch({ type: GET_ALL_BOOKS, payload: books });
    });
  }, []);

  // Search for Books
  const searchBooks = searchText => {
    let searchResult = [];
    searchText
      ? BooksAPI.search(searchText).then(async books => {
          console.log(books);
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
  };

  // Update API Bookshelf
  useEffect(() => {
    async function updateShelf() {
      state.selectedBook &&
        (await BooksAPI.update(state.selectedBook, state.selectedBook.shelf));
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

  // Clear Search Results
  const clearSearchResults = () => {
    dispatch({ type: CLEAR_BOOKS });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        selectedBook: state.selectedBook,
        searchResult: state.searchResult,
        showSearchPage: state.showSearchPage,
        loading: state.loading,
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
