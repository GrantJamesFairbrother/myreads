import React, { useContext } from 'react';
import BookContext from '../context/bookContext';
import Search from './Search';
import Header from './Header';
import BookShelf from './BookShelf';

const MainDisplay = () => {
  const bookContext = useContext(BookContext);

  const { books, showSearchPage, displaySearch } = bookContext;

  return (
    <div className='app'>
      {showSearchPage ? (
        <Search displaySearch={displaySearch} />
      ) : (
        <div className='list-books'>
          <Header />
          <BookShelf books={books} displaySearch={displaySearch} />
        </div>
      )}
    </div>
  );
};

export default MainDisplay;
