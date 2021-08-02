import React from 'react';
import logo2 from './logo2.svg';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Main from './components/Main';
import { SearchBar } from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img className="App-logo" src={logo2} alt=""></img>
        </div>
        <SearchBar />
      </header>
      <Main />
    </div>
  );
}

export default App;
