import { logger } from '../../../helpers/logger';
import { pgQuery } from '../../../database/connection';
/**
 * Delete Note
 * @param id
 * @return {Promise<'ok' | { error: string }>}>
 */
export const deleteNote = async (id: string): Promise<'ok' | { error: string }> => {
  try {
    const text = 'DELETE FROM notes WHERE id = $1';
    await pgQuery(text, [id]);
    return 'ok';
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
