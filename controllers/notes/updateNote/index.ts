import { logger } from '../../../helpers/logger';
import { IParams, IResUpdateNote } from './interfaces';
import { pgQuery } from '../../../database/connection';
/**
 * Update Note
 * @param {IParams}
 * @return {Promise<IResUpdateNote>}>
 */
export const updateNote = async (data: IParams): Promise<IResUpdateNote> => {
  try {
    const { title, is_share_note, body, user_id } = data;
    const text =
      'UPDATE notes SET title = $1, is_share_note = $2, body = $3, updated_at = now() WHERE user_id = $4 RETURNING *';

    const values = [title, is_share_note, body, user_id];
    const result = await pgQuery(text, values);

    return result;
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
