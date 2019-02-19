var fs = require('fs');
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
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  logLevel: {
    doc: 'The default logger log level',
    format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
    default: 'info',
    env: 'LOG_LEVEL'
  },
  freefit: {
    baseUrl: {
      doc: 'freefit schema + host',
      format: 'url',
      default: 'https://freefit.co.il'
    },
    citiesPath: {
      doc: 'freefit cities list path',
      format: String,
      default: '/Pages/ClubList'
    }
  },
  geocoder: {
    provider: {
      doc: 'default geocoder provider',
      format: ['google', 'here', 'mapquest'],
      default: 'google'
    },

    httpAdapter: {
      format: ['http', 'https', 'request'],
      default: 'https'
    },
    apiKey: {
      format: String,
      default: 'YOUR_API_KEY',
      env: 'GEOCODER_API_KEY'
    }
  },
  locationDecorator: {
    batchSize: {
      doc: 'location decorator geocode batch size ',
      format: Number,
      default: 20
    },
    delay: {
      doc: 'delay between batches',
      format: Number,
      default: 1000
    }
  },
  database: {
    type: 'postgres',
    host: {
      default: 'localhost',
      env: 'POSTGRES_HOST'
    },
    port: {
      default: 5432,
      env: 'POSTGRES_PORT'
    },
    username: {
      default: 'postgres',
      env: 'POSTGRES_USERNAME'
    },
    password: {
      default: 'postgres',
      env: 'POSTGRES_PASSWORD'
    },
    database: {
      default: 'freefit',
      env: 'POSTGRES_DATABASE'
    },
    synchronize: false,
    logging: false,
    logger: 'advanced-console',
    migrations: ['./dist/database/migrations/*.js'],
    migrationsRun: true,
    entities: ['./dist/database/entities/*.js'],
    cli: {
      migrationsDir: './dist/database/migrations'
    }
  }
});

const filePath = path.join(__dirname, `${config.get('env')}.json`);
if (fs.existsSync(filePath)) {
  config.loadFile(filePath);
}

config.validate({
  allowed: 'strict'
});

module.exports = config;