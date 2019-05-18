import React, {Component} from 'react';
import Panel from '../components/Panel';
import {ClockIcon} from '../components/Icons';

const UPDATE_INTERVAL = 1000;

interface ClockWidgetState {
  time: Date;
}

export default class ClockWidget extends Component<any, ClockWidgetState> {

  state = {
    time: new Date()
  };

  timeoutHandle: number | null = null;

  updateTime = () => {
    this.setState({ time: new Date() });
  };

  componentDidMount() {
    this.timeoutHandle = window.setInterval(this.updateTime, UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    if (this.timeoutHandle) {
      clearInterval(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }

  render() {
    return (
      <Panel>
        <div style={{fontSize: '2rem'}}>
          <ClockIcon />
          {' '}
          {this.state.time.toLocaleTimeString('fi-FI', {hour: '2-digit', minute:'2-digit'})}
        </div>
      </Panel>
    );
  }
}
