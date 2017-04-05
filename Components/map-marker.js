import React, { Component , PropTypes} from 'react';
import { Components } from 'exponent';
const { MapView } = Components;

export default class MapMarker extends Component {
  
  getType(bench) {
    return `Type: ${bench.properties.Type}`
  }


  render() {

    const { bench } = this.props; 

    return ( 
      <MapView.Marker
        title={bench.properties.Address} 
        description={this.getType(bench)}
        coordinate={bench.latlng} />
    )
  }
}



MapMarker.propTypes = { 
  bench: PropTypes.object.isRequired, 
}