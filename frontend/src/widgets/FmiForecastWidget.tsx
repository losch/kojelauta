import React, {Component} from 'react';
import Panel from '../components/Panel';
import FmiWeatherIcons from '../components/fmi/FmiWeatherIcons';

interface FmiForecastWidgetState {}

export default class FmiForecastWidget extends Component<any, FmiForecastWidgetState> {

  state = {};

  render() {

    const Icon = FmiWeatherIcons[2];

    return (
      <Panel>
        <div>
          <h4>Sääennuste</h4>
          <Icon />
        </div>
      </Panel>
    );
  }
}
