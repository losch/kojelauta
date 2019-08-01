import React, { Component } from 'react';
import './App.css';
import './components/Icons.tsx';
import ClockWidget from './widgets/ClockWidget';
import {EventProps, withWebSocketMessage} from './api';
import TemperatureWidget from './widgets/TemperatureWidget';
import CoffeeMachineWidget from './widgets/CoffeeMachineWidget';
import FmiForecastWidget from './widgets/FmiForecastWidget';

class App extends Component<EventProps, any> {

  state = {
    widgets: [TemperatureWidget, ClockWidget, FmiForecastWidget],
    coffeeEnabled: null
  };

  componentWillReceiveProps(nextProps: Readonly<EventProps>, nextContext: any): void {
    if (nextProps.event.type === 'coffee') {
      this.setState({ coffeeEnabled: (nextProps.event as any).enabled });
    }
  }

  render() {

    const event = this.props.event;

    return (
      <div>
        <div className="App">
          {
            this.state.widgets.map((Widget, i) =>
              <Widget key={i} event={event} />
            )
          }
        </div>

        <div className="App">
          <CoffeeMachineWidget event={event} emit={this.props.emit} />
        </div>
      </div>
    );
  }
}

export default withWebSocketMessage(App);
