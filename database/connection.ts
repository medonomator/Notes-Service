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
        id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        share_link VARCHAR(256),
        isEnableNotes boolean DEFAULT false,
        body character(1000) NOT NULL,
        user_id integer NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`;

pg.query(users).catch((err: Error) => logger.error(err));
pg.query(notes).catch((err: Error) => logger.error(err));
