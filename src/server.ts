import app from './app';
import logger from './utils/logger';
import config from './config';
import { createConnection } from 'typeorm';

function handleError(error: Error) {
  logger.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

const start = async () => {
  try {
    const connectionOptions = config.get('database');
    await createConnection(connectionOptions);
    await app.listen(config.get('port'), '0.0.0.0');
  } catch (err) {
    handleError(err);
  }
};

start();
