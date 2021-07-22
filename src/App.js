import React from 'react';
import logo from './logo.svg';
import newLogo from './newLogo.svg'
import './App.css';
import Main from './components/Main';
import { setCategory, fetchSearchResults, setSearchTerm, selectSearchTerm } from './store/redditPost/redditPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setShowComments } from './store/redditComments/redditCommentsSlice';

function App() {
  const dispatch = useDispatch();
  const term = useSelector(selectSearchTerm);

  const handleClick = (e) => {
    dispatch(setCategory(e.target.id));
    dispatch(setShowComments(false));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await dispatch(fetchSearchResults(term));
    dispatch(setShowComments());
  };

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='logo-container'>
          <img className='App-logo' src={newLogo} alt=''></img>
        </div>
        {/* <form onSubmit={handleSearch}>
          <input type='text' placeholder='search...' onChange={handleChange} value={term}></input>
          <input type='submit' value='Search'></input>
        </form> */}
      </header>
      <Main onClick={handleClick} />
    </div>
  );
}

export default App;
