import React, { useContext } from 'react';
import BookContext from '../context/bookContext';
import Search from './Search';
import Header from './Header';
import BookShelf from './BookShelf';
import { Route, Switch } from 'react-router-dom';
//import PageNotFound from './404/PageNotFound';

const MainDisplay = () => {
  const bookContext = useContext(BookContext);

  const { books, showSearchPage, displaySearch } = bookContext;

  return (
    <div className='app'>
      <Switch>
        {showSearchPage ? (
          <Route path='/search' exact component={Search} />
        ) : (
          <Route
            path='/'
            exact
            render={() => {
              return (
                <>
                  <div className='list-books'>
                    <Header />
                    <BookShelf books={books} displaySearch={displaySearch} />
                  </div>
                </>
              );
            }}
          />
        )}
        <Route component={Search} />
      </Switch>
    </div>
  );
};

export default MainDisplay;
