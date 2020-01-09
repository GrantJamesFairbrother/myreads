import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import MainDisplay from './components/MainDisplay';
import BookState from './context/BookState';

const BooksApp = () => {
  return (
    <BookState>
      <div className='app'>
        <MainDisplay />
      </div>
    </BookState>
  );
};

export default BooksApp;
