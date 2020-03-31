import { logger } from '../../../helpers/logger';
import { pgQuery } from '../../../database/connection';
import { IResponse, INote } from './interfaces';
/**
 * Share Note
 * @param {noteId}
 * @return {Promise<Exclude<IResponse, 'error'>>}>
 */
export const getShareNote = async (noteId: string): Promise<Exclude<IResponse, 'error'>> => {
  try {
    const text = 'SELECT * FROM notes WHERE id = $1 AND is_share_note = true';
    const result = await pgQuery(text, [noteId]);

    if (result) {
      const { id, title, body } = result;
      return { id, title, body } as INote;
    } else {
      return { error: 'Not found' } ;
    }
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
