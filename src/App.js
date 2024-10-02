// App.js
import React from 'react';
import NewsList from './NewsList';
import './App.css'; // Global CSS for the header

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>News App</h1>
      </header>
      <NewsList />
    </div>
  );
}

export default App;
