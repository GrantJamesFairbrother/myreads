import React, { useContext } from 'react';
import BookContext from '../context/bookContext';
import Search from './Search';
import Header from './Header';
import BookShelf from './BookShelf';
import { Route, Switch } from 'react-router-dom';
import Spinner from './spinner/Spinner';
//import PageNotFound from './404/PageNotFound';

const MainDisplay = () => {
  const bookContext = useContext(BookContext);

  const { showSearchPage, loading } = bookContext;

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
                    {loading ? <Spinner /> : <BookShelf />}
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
