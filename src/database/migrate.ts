import { createConnection } from './';
import logger from '../utils/logger';

const migrate = async () => {
  try {
    const connection = await createConnection();
    await connection.runMigrations();
  } catch (e) {
    logger.error('Failed running migrations', e);
    process.exit(1);
  }
};

migrate();
