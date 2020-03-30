import * as asyncRedis from 'async-redis';
import { logger } from '../helpers/logger';
import { pgQuery } from './connection';

export const redisClient = asyncRedis.createClient();

redisClient.on('connect', async () => {
  try {
    logger.info('Redis connected');
    // This is stuff in order to if the server crashes then need to restore the cache unlogin users
    const allUnloginUsers = await pgQuery('SELECT * FROM users WHERE is_active = false');

    if (allUnloginUsers) {
      allUnloginUsers.forEach(async ({ user_id }) => {
        await redisClient.set(user_id, 'isBlock');
      });
    }
  } catch (error) {
    logger.error(error);
  }
});

redisClient.on('error', async err => {
  logger.error('Connect Redis Error ' + err);
});
