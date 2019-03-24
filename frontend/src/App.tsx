import React, { Component } from 'react';
import './App.css';

const UPDATE_INTERVAL = 5000;

interface TemperatureSensorMeasurement {
  mac: string;
  temperature: string;
  humidity: string;
}

interface TemperatureSensorMeasurements {
  [key: string]: TemperatureSensorMeasurement[];
}

interface AppState {
  sensors: TemperatureSensorMeasurements;
}

class App extends Component<any, AppState> {

  state = {
    sensors: {} as TemperatureSensorMeasurements
  };

  private timeoutHandle: number | null = null;

  updateSensorData = async () => {
    const response = await fetch('http://localhost:8080/temperature');
    const data = await response.json();
    this.setState({ sensors: data });
  };

  componentDidMount() {
    this.timeoutHandle = window.setInterval(this.updateSensorData, UPDATE_INTERVAL);
    this.updateSensorData();
  }

  componentWillUnmount() {
    if (this.timeoutHandle) {
      clearInterval(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.sensors ?
            Object.keys(this.state.sensors).map((mac, i) =>
              <div key={i} className="Panel">
                <table className="PanelContents">
                  <tbody>
                  <tr>
                    <td>MAC</td>
                    <td className="SensorValue">
                      {this.state.sensors[mac][0].mac}
                    </td>
                  </tr>
                  <tr>
                    <td>TEMP</td>
                    <td className="SensorValue">
                      {this.state.sensors[mac][0].temperature} &deg;C
                    </td>
                  </tr>
                  <tr>
                    <td>HUM</td>
                    <td className="SensorValue">
                      {this.state.sensors[mac][0].humidity} %
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            ) :
            <div>NO DATA</div>
        }
      </div>
    );
  }
}

export default App;
