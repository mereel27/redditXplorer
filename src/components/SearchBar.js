import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchTerm,
  fetchSearchResults,
  setSearchTerm,
} from '../store/redditPost/redditPostSlice';
import { setShowComments } from '../store/redditComments/redditCommentsSlice';

export const SearchBar = () => {
  const term = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleSearch =  (e) => {
    e.preventDefault();
    if (term.length === 0) return;
    dispatch(setShowComments(false));
    dispatch(fetchSearchResults(term));
  };

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={term}
        />
        <button id='search-button' type="submit">Search</button>
      </form>
    </div>
  );
};
