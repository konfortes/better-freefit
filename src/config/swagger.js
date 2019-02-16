const packageJson = require('../../package.json');
const config = require('../config');

module.exports = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Better Freefit',
      description: packageJson.description,
      version: packageJson.version
    },
    host: `localhost:${config.get('port')}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: []
  }
};