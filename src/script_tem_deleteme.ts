const NodeGeocoder = require('node-geocoder');
const config = require('./config');

const options = config.get('geocoder');
const geocoder = NodeGeocoder(options);

// geocoder.geocode('הולמס פלייס מודיעון').then(console.log);
geocoder.batchGeocode(['	קאנטרי מעלות']).then(results => {
  console.log(JSON.stringify(results, null, 4));
  for (const result of results) {
    if (result.error) {
      console.log(result.error);
      continue;
    }
  }
});
