const NodeGeocoder = require('node-geocoder');
const config = require('./config');

const options = config.get('geocoder');
const geocoder = NodeGeocoder(options);

geocoder.geocode('הולמס פלייס מודיעון').then(console.log);
