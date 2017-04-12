import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import benchesData from './Constants/Benches';
import MapMarker from './Components/map-marker';

//   {markers.map(this._getMarker)}
export default class benchesReactNative extends Component {
  constructor() {
    super();

    this.state = {
      markers: [],
    };
  }
  componentDidMount() {
    const { markers } = this.state;
    this.setState({ markers: benchesData.items.slice(0, 50) });
  }

  _getMarker = (bench) => {
    return (
      <MapMarker
        bench={bench}
        key={Math.random()}
      />
    );
  }

  render() {
    const { markers } = this.state;

    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.0059,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        {markers.map(this._getMarker)}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

AppRegistry.registerComponent('benchesReactNative', () => benchesReactNative);
