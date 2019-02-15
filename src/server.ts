import app from './app';
import logger from './utils/logger';
import config from './config';

function handleError(error: Error) {
  logger.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

const start = async () => {
  try {
    await app.listen(config.get('port'), '0.0.0.0');
  } catch (err) {
    handleError(err);
  }
};

start();
