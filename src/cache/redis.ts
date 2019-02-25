import * as redis from 'redis';
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
import logger from '../utils/logger';

class RedisClient {
  private _client: redis.RedisClient;

  constructor() {
    this._client = redis.createClient();
    this._client.on('error', error => logger.error({ error }, `redis error`));
  }

  public set(key: string, value: string, ttl: number = 60) {
    this._client.setex(key, ttl, value);
  }

  public get(key: string) {
    return this._client.get(key);
  }

  // public get(key: string, fn: redis.Callback<string>) {
  //   return new Promise((resolve, reject) => {
  //     this._client.get(key, (err, reply) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(reply);
  //       }
  //     });
  //   });
  // }

  public fetch(key: string, getFn: Function): Promise<any> {
    return new Promise((resolve, reject) => {
      this._client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else if (!reply) {
          getFn()
            .then((val: any) => {
              if (val) {
                this._client.set(key, JSON.stringify(val));
                resolve(val);
              } else {
                reject('unable to fetch');
              }
            })
            .catch((err: any) => reject(err));
        } else {
          resolve(JSON.parse(reply));
        }
      });
    });
  }
}

export const redisClient = new RedisClient();
