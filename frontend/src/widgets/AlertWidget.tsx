import React, {Component} from 'react';
import Panel from '../components/Panel';
import {Event} from '../api';
import {ExcalamationIcon} from '../components/Icons';

interface AlertEvent extends Event {
  type: "alert";
  severity: string;
  message: string;
}

interface AlertWidgetProps {
  event: Event;
}

interface AlertWidgetState {
  latestEvent: null | AlertEvent;
}

export default class AlertWidget extends Component<AlertWidgetProps, AlertWidgetState> {

  state: AlertWidgetState = {
    latestEvent: null
  };

  componentWillReceiveProps(nextProps: Readonly<AlertWidgetProps>): void {
    if (nextProps.event.type === "alert") {
      this.setState({latestEvent: nextProps.event as AlertEvent});
    }
  }

  render() {
    const event: AlertEvent | null = this.state.latestEvent;
    let className;
    let showIcon = true;

    if (event !== null) {
      switch (event.severity) {
        case 'DISASTER': className = "disaster"; break;
        case 'DANGER': className = "danger"; break;
        case 'WARNING': className = "warning"; break;
        case 'INFO': className = "info"; showIcon = false; break;
        default: className = ""; showIcon = false;
      }
    }

    return (
      <Panel className={className}>
        {!event && <div>Ei hälytyksiä</div>}
        {
          event &&
            <div>
              {showIcon && <ExcalamationIcon />}
              &nbsp;&nbsp;
              {event.message}
              &nbsp;&nbsp;
              {showIcon && <ExcalamationIcon />}
            </div>
        }
      </Panel>
    )
  }
}
