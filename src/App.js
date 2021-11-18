import React, { Component } from 'react';
import Ball from './components/Ball';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Ball num={17} />
        <Ball num={12} />
        <Ball num={9} />
        <Ball num={10} />
      </div>
    );
  }
}

export default App;
