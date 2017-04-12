import React, { Component, PropTypes } from 'react';
import MapView from 'react-native-maps';

export default class MapMarker extends Component {
  static propTypes = {
    bench: PropTypes.object.isRequired,
  };

  getType = (bench) => {
    return `Type: ${bench.properties.Type}`;
  }

  render() {
    const { bench } = this.props;

    return (
      <MapView.Marker
        title={bench.properties.Address}
        description={this.getType(bench)}
        coordinate={bench.latlng}
      />
    );
  }
}
