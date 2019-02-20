import { createConnection as createDbConnection, Connection } from 'typeorm';
const config = require('../config');

export const createConnection = (
  name: string = 'default'
): Promise<Connection> => {
  const connectionOptions = config.get('database');
  return createDbConnection(connectionOptions);
};
