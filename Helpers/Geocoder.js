// import { API_KEY } from '../config';

class Geocoder {   

  constructor() {
    this.apiKey = 'AIzaSyAB5P5VYVbcn7JxR-IERbsko3WkhJrI9iA';
    this.baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  }


  getGeolocation(address){
    const encoded = encodeURI(address); 
    const url = `${this.baseURL}${encoded}&key=${this.apiKey}`;
    
    return fetch(url)
      .then((data) => data.json())
      .catch((error) => {
        console.log(error);
      })

  }
}

export default Geocoder;