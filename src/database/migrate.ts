import dbConnection from './';
import logger from '../utils/logger';

const migrate = async () => {
  try {
    const db = await dbConnection;
    await db.runMigrations();
  } catch (e) {
    logger.error('Failed running migrations', e);
    process.exit(1);
  }
};

migrate();
