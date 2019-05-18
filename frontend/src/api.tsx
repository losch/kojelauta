import React, { Component }  from 'react';

export interface Event {
  type: string;
}

export interface EventProps {
  event: Event;
  emit: (message: object) => void;
}

interface WebSocketMessageState {
  event?: Event;
}

export function withWebSocketMessage(WrappedComponent: any) {

  return class extends Component<any, WebSocketMessageState> {

    ws: WebSocket | null = null;

    state: WebSocketMessageState = {};

    initWebsocket() {
      this.ws = new WebSocket(`ws://${window.location.hostname}:8080/events`);
      this.ws.onopen = () => { console.log('connection established') };
      this.ws.onclose = () => {
        console.log('Connection closed. Trying to reconnect in 5 seconds...');
        window.setTimeout(() => this.initWebsocket(), 5000);
      };
      this.ws.onerror = (err) => { console.log('error: ', err)};
      this.ws.onmessage = (event) => {
        if (JSON.parse(event.data).type == "ping") {
          this.emit({type: 'pong', timestamp: new Date()});
        }
        this.setState({event: JSON.parse(event.data)});
      }
    }

    emit = (message: object) => {
      if (this.ws) {
        this.ws.send(JSON.stringify(message));
      }
    };

    componentDidMount(): void {
      this.initWebsocket();
    }

    componentWillUnmount(): void {
      if (this.ws) {
        this.ws.close();
      }
    }

    render() {
      return <WrappedComponent event={this.state.event}
                               emit={this.emit}
                               {...this.props} />;
    }
  };
}
