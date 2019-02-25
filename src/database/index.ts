import { createConnection as createDbConnection, Connection } from 'typeorm';
const config = require('../config');

interface RetryOptions {
  retries: number;
  wait: number;
}
export const createConnection = async (
  name: string = 'default',
  // TODO: from config
  retryOptions: RetryOptions = { retries: 3, wait: 5000 }
): Promise<Connection> => {
  const connectionOptions = config.get('database');

  const connection = await withRetry(
    createDbConnection,
    connectionOptions,
    retryOptions
  );

  return connection;
};

const withRetry = async (
  func: any,
  params: any,
  options: RetryOptions
): Promise<any> => {
  let retries = 1 + options.retries;

  while (retries > 0) {
    try {
      const result = await func(params);
      return result;
    } catch (error) {
      --retries;
      if (retries <= 0) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, options.wait));
    }
  }
};
