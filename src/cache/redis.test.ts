import logger from '../utils/logger';
import * as redis from 'redis';
const bluebird = require('bluebird');

describe('RedisClient', () => {
  const client = redis.createClient();
  client.on('error', error => logger.error({ error }, `redis error`));
  describe('#set and #get', () => {
    it('should set and get correctly', async () => {
      await new Promise(resolve => {
        client.set('testKey', 'test value', () => resolve());
      });

      const value = await new Promise((resolve, reject) => {
        client.get('testKey', (err, reply) => {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        });
      });

      expect(value).toBe('test value');
    });
  });

  describe('#get and #set using bluebird', () => {
    bluebird.promisifyAll(redis);
    const client = redis.createClient();

    it('should set and get correctly', async () => {
      await (client as any).setAsync('bluebird', 'bluebird test');
      const result = await (client as any).getAsync('bluebird');

      expect(result).toBe('bluebird test');
    });
  });
});
