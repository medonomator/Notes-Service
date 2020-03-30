import { logger } from '../../../helpers/logger';
import { INotes, IResponse } from './interfaces';
import { pgQuery } from '../../../database/connection';
/**
 * Get Notes
 * @param userId
 * @return {Promise<IResponse>}>
 */
export const getNotes = async (user_id: string): Promise<IResponse> => {
  try {
    const text = 'SELECT * FROM notes WHERE user_id = $1';
    const values = [user_id];
    const notes: INotes[] = await pgQuery(text, values);

    logger.info(`Get all Notes from ${user_id}`);

    return { notes, error: null };
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
