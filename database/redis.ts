import * as asyncRedis from 'async-redis';
import { logger } from '../helpers/logger';

export const redisClient = asyncRedis.createClient();

redisClient.on('connect', function() {
  logger.info('Redis connected');
});
redisClient.on('error', function(err) {
  logger.error('Connect Redis Error ' + err);
});
