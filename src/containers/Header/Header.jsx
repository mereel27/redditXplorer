import { useEffect } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './Header.css';
import logo2 from '../../img/logo2.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchTerm,
  fetchSearchResults,
  setSearchTerm,
  setCategory,
} from '../../features/redditPostSlice/redditPostSlice';
import { setShowComments } from '../../features/redditCommentsSlice/redditCommentsSlice';
import { setTheme, toggleTheme } from '../../utils/utils';

export const Header = () => {
  const term = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.length === 0) return;
    dispatch(setShowComments(false));
    dispatch(setCategory('search'));
    dispatch(fetchSearchResults(term));
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else {
      setTheme('theme-light');
    }
  }, []);

  return (
    <header className="App-header">
      <div className="logo-container">
        <img className="App-logo" src={logo2} alt=""></img>
      </div>
      <SearchBar
        handleSearch={handleSearch}
        handleChange={handleChange}
        term={term}
      />
      <button
        className="theme-switch"
        id={localStorage.getItem('theme') === 'theme-dark' ? 'sun' : 'moon'}
        onClick={toggleTheme}
      ></button>
    </header>
  );
};
