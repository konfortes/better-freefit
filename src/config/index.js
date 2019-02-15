const path = require('path');
const convict = require('convict');
require('dotenv').config();

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5001,
    env: 'PORT',
    arg: 'port'
  },
  logLevel: {
    doc: 'The default logger log level',
    format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
    default: 'info',
    env: 'LOG_LEVEL'
  }
});

// Load test env configuration
if (config.get('env') === 'test') {
  config.loadFile(path.join(__dirname, 'test.json'));
}

config.validate({ allowed: 'strict' });

module.exports = config;