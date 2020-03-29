import { logger } from '../../../helpers/logger';
import { encryptData, prepareTokens } from '../../../helpers';
import { IResCreateUser, User } from './interfaces';
import { pgQuery } from '../../../database/connection';
/**
 * Create New User
 * @param login
 * @param password
 * @return {Promise<IResCreateUser>}>
 */
export const createUser = async (login: string, password: string): Promise<IResCreateUser> => {
  try {
    const text = 'INSERT INTO users(login, password) VALUES($1, $2) RETURNING *';
    const values = [login, encryptData(password, login.toLowerCase())];
    const user: User = await pgQuery(text, values);
    const userId = user.id;

    const { token, refreshToken, expiresIn } = prepareTokens({ userId, login });

    const updateToken = 'UPDATE users SET refresh_token = $1 WHERE id = $2';
    const updateValues = [refreshToken, userId];
    await pgQuery(updateToken, updateValues);

    logger.info(`new user >>> ${login} <<< was created`);

    return { token, refreshToken, expiresIn, error: null };
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
