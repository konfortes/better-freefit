const config = require('../config');

import { getConnectionManager } from 'typeorm';

let databaseOptions = config.get('database');

const dbConnection = async () =>
  await getConnectionManager()
    .create({ ...databaseOptions })
    .connect();

export default dbConnection();
