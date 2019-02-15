const packageJson = require('../../package.json');
const config = require('../config');

module.exports = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'First API',
      description: packageJson.description,
      version: packageJson.version
    },
    externalDocs: {
      url: 'https://firstdag.com',
      description: 'Read our guides'
    },
    host: `localhost:${config.get('port')}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: []
  }
};