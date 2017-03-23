import Exponent from 'exponent';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Components } from 'exponent';
import benchesData from './benches';
const { MapView } = Components;

// Assuming data is JSON with Latitude and Longitude
// We can remove these 3 next lines
// import Geocoder from './Helpers/Geocoder';
// const benches = Benches.items.slice(0,10);
// const geocoder = new Geocoder();

class App extends Component {

  constructor() {
    super();

    this.state = {
      markers: [],
    }
  }

  componentDidMount() {
    const { markers } = this.state;
    const markersArr = [];

    benchesData.items.map((bench) => {

      // Looping through array of Benches
      // For now using ADDRESS instead of LATLNG
      // TODO: Find correct data and push LATLNG instead
      // newArr.push(bench.properties.latlng) -- has to be an object like so: 
      // { latitude: 40.9128, longitude: -74.0059 }

      markersArr.push(bench.properties.latlng);
    });

    this.setState({ markers: markersArr });

  }

  // Get 10 benches 
  // loop through benches to get address and call geoLocation function on them. 
  // format return jSON to match latlong object. 
  // update markers array in state with new object (dont remove old ones). 

  // componentDidMount() {
    // geocoder.getGeolocation("West 113th Street & West 114th Street")
    //   .then((data) => {
    //     const newMarkers = [...markers]
    //     newMarkers.push(//o formatted object)
    //     this.setState({markers: newMarkers})
    //   })
  // }

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
