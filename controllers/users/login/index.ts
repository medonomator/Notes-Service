import { logger } from '../../../helpers/logger';
import { encryptData, prepareTokens } from '../../../helpers';
import { IResUser, User } from './interfaces';
import { pgQuery } from '../../../database/connection';
import { redisClient } from '../../../database/redis';
/**
 * User login
 * @param login
 * @param password
 * @return {Promise<IResUser>}>
 */
export const userLogin = async (login: string, password: string): Promise<IResUser> => {
  try {
    const text = 'SELECT * FROM users WHERE login = $1 AND password = $2';
    const values = [login, encryptData(password, login.toLowerCase())];
    const user: User = await pgQuery(text, values);
    const { user_id } = user;

    if (!user.is_active) {
      const text = 'UPDATE users SET is_active = true WHERE login = $1';
      const values = [login];
      await pgQuery(text, values);
    }

    if (!user) {
      return { error: 'invalid username or password' };
    }
    // set unBlock current user
    await redisClient.set(user_id, '');

    const { token, refreshToken, expiresIn } = prepareTokens({ user_id, login });

    return { token, refreshToken, expiresIn, error: null };
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
