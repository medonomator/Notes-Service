import { logger } from '../../../helpers/logger';
import { pgQuery } from '../../../database/connection';
/**
 * Share Note
 * @param {isShareNote}
 * @return {Promise<'ok' | { error: string }>}>
 */
export const shareNote = async (isShareNote: boolean, id: string): Promise<'ok' | { error: string }> => {
  try {
    const text = 'UPDATE notes SET is_share_note = $1 WHERE id = $2';
    await pgQuery(text, [isShareNote, id]);
    return 'ok';
  } catch (error) {
    logger.error(error);
    return { error: error.message };
  }
};
