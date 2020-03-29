import { logger } from '../../../helpers/logger';
import { encryptData, prepareTokens } from '../../../helpers';
import { IResCreateUser, User } from './interfaces';
import { pgQuery } from '../../../database/connection';
import * as uuid from 'uuid';
/**
 * Create New User
 * @param login
 * @param password
 * @return {Promise<IResCreateUser>}>
 */
export const createUser = async (login: string, password: string): Promise<IResCreateUser> => {
  try {
    const text = 'INSERT INTO users(login, password, user_id) VALUES($1, $2, $3) RETURNING *';
    const values = [login, encryptData(password, login.toLowerCase()), uuid.v4()];
    const user: User = await pgQuery(text, values);
    const userId = user.user_id;

    const { token, refreshToken, expiresIn } = prepareTokens({ userId, login });

    const updateToken = 'UPDATE users SET refresh_token = $1 WHERE user_id = $2';
    const updateValues = [refreshToken, userId];
    await pgQuery(updateToken, updateValues);

    logger.info(`new user >>> ${login} <<< was created`);

    return { token, refreshToken, expiresIn, error: null };
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
