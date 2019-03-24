import React, {Component} from 'react';
import Panel from '../components/Panel';
import {HeartbeatIcon} from '../components/Icons';

const UPDATE_INTERVAL = 5000;

interface TemperatureSensorMeasurement {
  mac: string;
  label?: string;
  temperature: string;
  humidity: string;
}

interface TemperatureSensorMeasurements {
  [key: string]: TemperatureSensorMeasurement[];
}

interface SensorsWidgetState {
  sensors: TemperatureSensorMeasurements;
  highlight: boolean;
}

export default class SensorsWidget extends Component<any, SensorsWidgetState> {

  state = {
    sensors: {} as TemperatureSensorMeasurements,
    highlight: false
  };

  private timeoutHandle: number | null = null;
  private highlightTimeoutHandle: number | null = null;

  updateSensorData = async () => {
    const response = await fetch('http://localhost:8080/temperature');
    const data = await response.json();
    this.setState({ sensors: data, highlight: true });
    window.setTimeout(() => this.setState({ highlight: false }), 400);
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

    if (this.highlightTimeoutHandle) {
      clearInterval(this.highlightTimeoutHandle);
      this.highlightTimeoutHandle = null;
    }
  }

  render() {
    return (
      <div>
        {
          this.state.sensors ?
            Object.keys(this.state.sensors).map((mac, i) =>
              <Panel key={i}>
                <table>
                  <tbody>
                  <tr>
                    <td colSpan={2}>
                      {
                        this.state.sensors[mac][0].label ||
                        this.state.sensors[mac][0].mac
                      }
                      {' '}
                      <div style={{
                          display: 'inline-block',
                          float: 'right',
                          width: 20,
                          textAlign: 'right'}
                        }>
                        {
                          this.state.highlight ?
                            <HeartbeatIcon/> :
                            null
                        }
                      </div>
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
              </Panel>
            ) :
            <Panel>No sensor data available</Panel>
        }
      </div>
    );
  }
}
