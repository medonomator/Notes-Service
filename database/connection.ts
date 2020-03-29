import { Pool } from 'pg';
import { logger } from '../helpers/logger';
import { PG_URI } from '../constants';

export const pg = new Pool({
  connectionString: PG_URI,
});

pg.connect((err: Error) => {
  if (err) {
    logger.error('connection error', err.stack);
  } else {
    logger.info('Postgres connected');
  }
});

const users = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        user_id uuid NOT NULL UNIQUE,
        login VARCHAR(128) NOT NULL UNIQUE,
        isActive boolean DEFAULT true,
        password VARCHAR(128) NOT NULL,
        refresh_token VARCHAR(263)
      )`;

const notes = `CREATE TABLE IF NOT EXISTS
      notes(
        id uuid PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        share_link VARCHAR(256),
        isShareNote boolean DEFAULT false,
        body text NOT NULL CHECK ( char_length(body) <= 1000 ),
        user_id uuid NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        created_at timestamp  NOT NULL  DEFAULT now(),
        updated_at timestamp  NOT NULL  DEFAULT now()
      )`;

(async () => {
  try {
    await pg.query(users);
    await pg.query(notes);
  } catch (error) {
    logger.error(error);
  }
})();

export const pgQuery = async (text: string, values?: string[]) => {
  try {
    const result = await pg.query(text, values);

    if (result.rows.length > 1) {
      return result.rows;
    } else {
      return result.rows[0];
    }
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};
