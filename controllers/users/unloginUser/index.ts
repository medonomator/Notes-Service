import { logger } from '../../../helpers/logger';
import { IResponse } from './interfaces';
import { pgQuery } from '../../../database/connection';
import { redisClient } from '../../../database/redis';
/**
 * Unlogin user
 * @param login
 * @param password
 * @return {Promise<IResUser>}>
 */
export const unloginUser = async (login: string, user_id: string): Promise<IResponse> => {
  try {
    // set block current user
    await redisClient.set(user_id, 'isBlock');

    const text = 'UPDATE users SET is_active = false, refresh_token = $1 WHERE login = $2 AND user_id = $3';
    const values = ['empty', login, user_id];
    await pgQuery(text, values);

    return { update: 'ok', error: null };
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
