const NodeGeocoder = require('node-geocoder');
const config = require('./config');

const options = config.get('geocoder');
const geocoder = NodeGeocoder(options);

// geocoder.geocode('הולמס פלייס מודיעון').then(console.log);
geocoder
  .batchGeocode(['הולמס פלייס מודיעין', 'הולמד פלייס הרצלייה'])
  .then(results => {
    for (const result of results) {
      if (result.error) {
        console.log(result.error);
        continue;
      }
      console.log(JSON.stringify(result.value, null, 4));
    }
  });
