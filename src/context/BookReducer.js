import {
  DISPLAY_SEARCH,
  GET_ALL_BOOKS,
  CHANGE_SHELF,
  REMOVE_BOOK,
  SEARCH_BOOKS,
  CLEAR_BOOKS
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload
      };

    case SEARCH_BOOKS:
      console.log(action.payload);
      return {
        ...state,
        searchResult: !action.payload.error ? action.payload : null
      };

    case CLEAR_BOOKS:
      return {
        ...state,
        searchResult: null
      };

    case DISPLAY_SEARCH:
      return {
        ...state,
        showSearchPage: action.payload
      };

    case CHANGE_SHELF:
      return {
        ...state,
        books: state.books.filter(book => {
          if (book.id === action.payload.id) {
            book.shelf = action.payload.shelf;
            return book.id === action.payload.id;
          } else {
            return book;
          }
        })
      };
    case REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
      };

    default:
      return state;
  }
};
