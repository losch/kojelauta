import React, {Component} from 'react';
import Panel from '../components/Panel';
import {Event} from '../api';
import {WidgetProps} from './Widget';

interface CoffeeMachineEvent extends Event {
  type: "coffee";
  state: {
    enabled: boolean;
    schedulingEnabled: boolean;
    scheduledTime: string;
  };
}

interface CoffeeMachineWidgetProps extends WidgetProps {}

interface CoffeeMachineWidgetState {
  latestEvent: null | CoffeeMachineEvent;
}

export default class CoffeeMachineWidget extends Component<CoffeeMachineWidgetProps,
                                                           CoffeeMachineWidgetState> {

  state: CoffeeMachineWidgetState = {
    latestEvent: null
  };

  static getDerivedStateFromProps(props: CoffeeMachineWidgetProps, state: CoffeeMachineWidgetState): CoffeeMachineWidgetState | null {
    if (props.event && props.event.type === "coffee") {
      return {
        ...state,
        latestEvent: props.event as CoffeeMachineEvent
      };
    }

    return null;
  }

  render() {
    const event = this.state.latestEvent;

    if (event == null) {
      return (
        <Panel>
          <div>Ei tilatietoa</div>
        </Panel>
      )
    }
    else {
      return (
        <Panel>
          <div style={{padding: 12}}>
            <table>
              <tbody>
              <tr>
                <td>Kahvinkeitin</td>
                <td>
                  <div className="button-group">
                    <button className={event && event.state.enabled ? 'on button' : 'button'}
                            onClick={() => event ? this.props.emit(
                              {type: 'coffee', state: { ...event.state, enabled: true }}
                            ) : {}}>
                      Päällä
                    </button>
                    <button className={event && !event.state.enabled ? 'off button' : 'button'}
                            onClick={() => event ? this.props.emit(
                              {type: 'coffee', state: { ...event.state, enabled: false }}
                            ) : {}}>
                      Pois
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Ajastus</td>
                <td>
                  <div className="button-group">
                    <button className={event && event.state.schedulingEnabled ? 'on button' : 'button'}
                            onClick={() => {
                              if (event) {
                                const scheduledTime = prompt("Syötä kellonaika", event.state.scheduledTime);
                                if (scheduledTime) {
                                  this.props.emit(
                                    {type: 'coffee',
                                      state: {
                                        enabled: event.state.enabled,
                                        schedulingEnabled: true,
                                        scheduledTime: scheduledTime
                                      }
                                    }
                                  )
                                }
                              }
                            }}>
                      {event && event.state.scheduledTime}
                    </button>
                    <button className={event && !event.state.schedulingEnabled ? 'off button' : 'button'}
                            onClick={() => event ? this.props.emit(
                              {type: 'coffee', state: { ...event.state, schedulingEnabled: false }}
                            ) : {}}>
                      Pois
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      );
    }
  }
}
