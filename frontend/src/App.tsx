import React, { Component } from 'react';
import './App.css';
import './components/Icons.tsx';
import ClockWidget from './widgets/ClockWidget';
import {EventProps, withWebSocketMessage} from './api';
import TemperatureWidget from './widgets/TemperatureWidget';

class App extends Component<EventProps, any> {

  state = {
    widgets: [TemperatureWidget, ClockWidget],
    coffeeEnabled: null
  };

  componentWillReceiveProps(nextProps: Readonly<EventProps>, nextContext: any): void {
    if (nextProps.event.type == 'coffee') {
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
          <div style={{padding: 12}}>
            Kahvi: {
              this.state.coffeeEnabled === true ? 'Päällä' :
              this.state.coffeeEnabled === false ? 'Pois päältä' :
              'Odotetaan tietoa...'
            }
          </div>
          <button className="button"
                  onClick={() => this.props.emit({type: 'coffee', enabled: true})}>
            Kahvi päälle
          </button>
          <button className="button"
                  onClick={() => this.props.emit({type: 'coffee', enabled: false})}>
            Kahvi pois päältä
          </button>
        </div>
      </div>
    );
  }
}

export default withWebSocketMessage(App);
