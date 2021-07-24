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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (term.length === 0) return;
    await dispatch(fetchSearchResults(term));
    dispatch(setShowComments());
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
        <button type="submit"></button>
      </form>
    </div>
  );
};
