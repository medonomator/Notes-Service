import express from 'express';
import bodyParser from 'body-parser';
import boom from 'express-boom';
import { logger } from './helpers/logger';
import { PORT } from './constants';
// routes
import userApi from './api/users';
// postgres connection
import { pg } from './database/connection';
pg.connect();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(boom());

app.use('/api', userApi);

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.boom.badRequest(err.error.toString());
  } else {
    next(err);
  }
});

app.listen(PORT);

logger.info(`Listening on port: ${PORT}`);

process.on('unhandledRejection', (error: Error) => {
  logger.error(`unhandledRejection ${error.message}`);
  logger.error(`unhandledRejection ${error.stack}`);
});

process.on('uncaughtException', (error: Error) => {
  logger.error(`uncaughtException ${error.message}`);
});
