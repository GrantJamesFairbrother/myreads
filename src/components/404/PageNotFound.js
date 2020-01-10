import React from 'react';
import Header from '../Header';

const PageNotFound = () => {
  return (
    <>
      <Header />
      <p>This page does not exist, try one of the pages below</p>
      <p>
        <a href='/'>Book Shelf</a>
        <br />
        <a href='/search'>Search for a Book</a>
      </p>
    </>
  );
};

export default PageNotFound;
