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

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };

    case SEARCH_BOOKS:
      return {
        ...state,
        searchResult: action.payload,
        loading: false
      };

    case ADD_BOOK:
      action.payload.book.shelf = action.payload.shelf;
      return {
        ...state,
        books: [...state.books, action.payload.book],
        selectedBook: action.payload.book
      };

    case CHANGE_SHELF:
      return {
        ...state,
        books: state.books.filter(book => {
          if (book.id === action.payload.book.id) {
            book.shelf = action.payload.shelf;
            return book.id === action.payload.book.id;
          } else {
            return book;
          }
        }),
        selectedBook: action.payload.book
      };

    case CLEAR_BOOKS:
      return {
        ...state,
        searchResult: null,
        loading: false
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case DISPLAY_SEARCH:
      return {
        ...state,
        showSearchPage: action.payload
      };

    case SHOW_ALERT:
      return {
        ...state,
        alert: true
      };

    case REMOVE_ALERT:
      return {
        ...state,
        alert: false
      };

    default:
      return state;
  }
};
