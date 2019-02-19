const config = require('../config');
import {
  createConnection,
  getConnection as getDbConnection,
  Connection
} from 'typeorm';

export const getConnection = async (
  name: string = 'default'
): Promise<Connection> => {
  let connection: Connection;
  try {
    connection = await getDbConnection(name);
    // TODO: not so elegant solution. figure out a way to solve it without using try catch
  } catch (error) {
    const connectionOptions = config.get('database');
    connection = await createConnection(connectionOptions);
    // await connection.connect();
  }

  return connection;
};
