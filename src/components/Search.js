import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BookContext from '../context/bookContext';
import Books from './Books';
//import Spinner from './spinner/Spinner';

const Search = () => {
  const bookContext = useContext(BookContext);

  const {
    toggleSearch,
    searchBooks,
    searchResult,
    clearSearchResults
  } = bookContext;

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link
          to='/'
          className='close-search'
          onClick={() => {
            toggleSearch(false);
            clearSearchResults();
          }}>
          Close
        </Link>
        <div className='search-books-input-wrapper'>
          <input
            onChange={event => {
              searchBooks(event.target.value);
            }}
            type='text'
            placeholder='Search by title or author'
          />
        </div>
      </div>
      <div className='search-books-results'>
        {/* <Spinner /> */}
        <ol className='books-grid'>
          {searchResult ? (
            searchResult.map(book => <Books book={book} key={book.id} />)
          ) : (
            <li>
              <p>
                Try one of the following search terms: 'Android', 'Art',
                'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball',
                'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
                'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',
                'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital
                Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
                'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness',
                'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror',
                'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri',
                'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage',
                'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting',
                'Philosophy', 'Photography', 'Poetry', 'Production',
                'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling',
                'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
                'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
                'Virtual Reality', 'Web Development', 'iOS'
              </p>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Search;
