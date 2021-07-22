import React from 'react';
import newLogo from './newLogo.svg'
import './App.css';
import Main from './components/Main';
import { setCategory } from './store/redditPost/redditPostSlice';
import { useDispatch } from 'react-redux';
import { setShowComments } from './store/redditComments/redditCommentsSlice';

function App() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(setCategory(e.target.id));
    dispatch(setShowComments(false));
  };

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
