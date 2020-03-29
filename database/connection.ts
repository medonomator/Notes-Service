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
        login VARCHAR(128) NOT NULL UNIQUE,
        password VARCHAR(128) NOT NULL,
        refresh_token VARCHAR(215)
      )`;

const notes = `CREATE TABLE IF NOT EXISTS
      notes(
        id uuid PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        share_link VARCHAR(256),
        isShareNote boolean DEFAULT false,
        body text NOT NULL CHECK ( char_length(body) <= 1000 ),
        user_id integer NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        created_at timestamp  NOT NULL  DEFAULT now(),
        updated_at timestamp  NOT NULL  DEFAULT now()
      )`;

pg.query(users).catch((err: Error) => logger.error(err));
pg.query(notes).catch((err: Error) => logger.error(err));

export const pgQuery = async (text: string, values: string[]) => {
  try {
    const result = await pg.query(text, values);
    return result.rows[0];
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};
