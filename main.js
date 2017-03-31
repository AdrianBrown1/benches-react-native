import Exponent from 'exponent';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Components } from 'exponent';
import benchesData from './benches';
const { MapView } = Components;
import Geocoder from './Helpers/Geocoder';

const geocoder = new Geocoder();

class App extends Component {

  constructor() {
    super();

    this.state = {
      markers: [],
    }
  }

  componentDidMount() {
    const { markers } = this.state;
    const smallArr = benchesData.items.slice(0, 10);

    benchesData.items.slice(0, 7).forEach((bench, index) => {
      const address = bench.properties.Geocode_Ad;

      geocoder.getGeolocation(address)
        .then((data) => {

          const { results } = data;
          const markersArr = [];

          results.forEach((item) => {
            const { geometry } = item;

            if (geometry.location) {
              const { location } = geometry;
              console.log(location);
              markersArr.push({
                latitude: location.lat,
                longitude: location.lng,
              });
            }
          });

          return markersArr;
        })
        .then((markersArr) => {
          this.setState({ markers: markersArr });
        });
    });
  }

  _getMarker = (coordinate) => (
    <MapView.Marker coordinate={coordinate} key={Math.random()} />
  )

  _routeToBenchOnMap = (bench) => {
    Alert.alert(
      'Bench Selected',
      bench.properties.Address,
      [
        {text: 'Nope', onPress: () => console.log('Ask me later pressed')},
        {text: 'Route Me', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
    )
  }

  render() {
    const { markers } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.0059,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map(this._getMarker)}
        </MapView>
        <ScrollView style ={styles.container}>
          {benchesData.items.map((bench) => {
            return (
              <TouchableOpacity
                key={Math.random()}
                onPress={() => this._routeToBenchOnMap(bench)}
                style={styles.listItem}
              >
                <Text style={styles.listItemTextTitle}>Address: </Text>
                <Text style={styles.listItemTextData}>
                  {bench.properties.Address}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 14,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  listItemTextTitle: {
    fontWeight: '600',
    fontSize: 20,
  },
  listItemTextData: {
    fontSize: 20,
    lineHeight: 22,
  }
});

Exponent.registerRootComponent(App);
