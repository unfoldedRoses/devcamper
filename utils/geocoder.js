const NodeGeocoder = require('node-geocoder');

const options = {
  provider:   'mapquest',
  httpAdapter: 'https',
  apiKey:'jeniOWz0PXMCLOYyn21hbQOraCDJZvwY',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;