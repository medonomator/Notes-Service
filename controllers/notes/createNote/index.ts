import { logger } from '../../../helpers/logger';
import { IResCreateNote } from './interfaces';
import { BASE_URL } from '../../../constants';
import { pgQuery } from '../../../database/connection';
import * as uuid from 'uuid';
/**
 * Create new Note
 * @param title
 * @param body
 * @return {Promise<IResCreateNote>}>
 */
export const createNote = async (title: string, body: string, user_id: string): Promise<IResCreateNote> => {
  try {
    const text = 'INSERT INTO notes(id, title, body, user_id, share_link) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const id = uuid.v4();
    const shareLink = `${BASE_URL}/share-note/${id}`;

    const values = [id, title, body, user_id, shareLink];
    const result = await pgQuery(text, values);

    logger.info(`New note >>> ${title} <<< was created`);

    return result;
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
