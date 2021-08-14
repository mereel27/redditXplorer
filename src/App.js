import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header } from './containers/Header/Header';
import MainContainer from './containers/MainContainer/MainContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContainer />
    </div>
  );
}

export default App;
