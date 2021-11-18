import React, { Component } from 'react';
import Lottery from './components/Lottery';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Lottery />
        <Lottery title="Extra Daily Special Runner" maxNum={10} numBalls={4} />
      </div>
    );
  }
}

export default App;
