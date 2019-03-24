import React, { Component } from 'react';
import './App.css';
import SensorsWidget from './widgets/SensorsWidget';
import './Icons.tsx';

class App extends Component {

  render() {
    return (
      <div className="App">
        <SensorsWidget />
      </div>
    );
  }
}

export default App;
