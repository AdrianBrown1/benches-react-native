import Promise from 'bluebird';
import benchesData from '../benches';
import Geocoder from '../Helpers/Geocoder';
import fs from 'fs';
const geocoder = new Geocoder();

const benches = benchesData.items;

Promise.mapSeries(benches, (bench, index) => {
  const address = bench.properties.Geocode_Ad;

  return geocoder.getGeolocation(address)
  .then((data) => {

    const topResult = data.results[0];
    if(!topResult) {
      console.log('No results for', address, 'rejecting item');
      return false;
    }
    const { geometry } = topResult;
    const { location } = geometry;
    console.log(location);
    return Object.assign({}, bench, {
      latlng: {
        latitude: location.lat,
        longitude: location.lng
      }
    });
  });
})
.then((parsedBenches) => {
  fs.writeFile('/tmp/benches.json', JSON.stringify(parsedBenches.filter((bench) => bench)));
});
