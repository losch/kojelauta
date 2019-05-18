import React, {Component} from 'react';
import Panel from '../components/Panel';
import {Event} from '../api';

interface TemperatureEvent extends Event {
  type: "temperature";
  measurements: {
    [key: string]: {
      mac: string;
      label: string;
      temperature: number;
      humidity: number;
    }[]
  };
}

interface TemperatureWidgetProps {
  event: Event;
}

interface TemperatureWidgetState {
  latestEvent: null | TemperatureEvent;
}

export default class TemperatureWidget extends Component<TemperatureWidgetProps,
                                                         TemperatureWidgetState> {

  state: TemperatureWidgetState = {
    latestEvent: null
  };

  componentWillReceiveProps(nextProps: Readonly<TemperatureWidgetProps>): void {
    if (nextProps.event.type === "temperature") {
      this.setState({latestEvent: nextProps.event as TemperatureEvent});
    }
  }

  render() {
    const event = this.state.latestEvent;
    const measurements = event ? event.measurements : null;

    if (!measurements) {
      return (
        <Panel>
          <div>Ei lämpötiloja</div>
        </Panel>
      );
    }
    else {
      return (
        <Panel>
          <div>
            <table>
            {
              Object.keys(measurements)
                .map(mac =>
                    <tbody key={mac}>
                    <tr>
                      <td style={{textAlign: 'left', fontWeight: 600}}>
                        {measurements[mac][0].label}
                      </td>
                      <td style={{textAlign: 'right', paddingLeft: 6}}>
                        {measurements[mac][0].temperature}&deg;C
                      </td>
                    </tr>
                    </tbody>
                )
            }
            </table>
          </div>
        </Panel>
      );
    }
  }
}
