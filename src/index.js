import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import BookState from './context/BookState';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BookState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BookState>,
  document.getElementById('root')
);
