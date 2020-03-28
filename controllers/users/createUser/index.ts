import { logger } from '../../../helpers/logger';
import { encryptData, prepareTokens } from '../../../helpers';
import { IResCreateUser, User } from './interfaces';
import { pg } from '../../../database/connection';
/**
 * Create New User
 * @param {IParams} params
 * @return {Promise<any>}>
 */
export const createUser = async (login: string, password: string): Promise<IResCreateUser> => {
  try {
    const text = 'INSERT INTO users(login, password) VALUES($1, $2) RETURNING *';
    const values = [login, encryptData(password, login.toLowerCase())];
    const result = await pg.query(text, values);
    const user: User = result.rows[0];
    const userId = user.id;

    const { token, refreshToken, expiresIn } = prepareTokens({ userId, login });

    const updateToken = 'UPDATE users SET refresh_token = $1 WHERE id = $2';
    const updateValues = [refreshToken, userId];
    await pg.query(updateToken, updateValues);

    logger.info(`new user >>> ${login} <<< was created`);

    return { token, refreshToken, expiresIn, error: null };
  } catch (err) {
    logger.error(err);
    return { error: err.message };
  }
};
