import React, { Component } from 'react';
import './App.css';
import SensorsWidget from './widgets/SensorsWidget';
import './components/Icons.tsx';
import ClockWidget from './widgets/ClockWidget';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ClockWidget />
        <SensorsWidget />
      </div>
    );
  }
}

export default App;
