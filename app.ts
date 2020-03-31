import express from 'express';
import bodyParser from 'body-parser';
import boom from 'express-boom';
import expressJwt from 'express-jwt';
import { logger } from './helpers/logger';
import { checkExpireSession } from './helpers/checkExpireSession';
import { PORT, TOKEN_SIGN_KEY } from './constants';
import { checkIsUuid, errorIsJoi } from './helpers/middlewares';
// routes
import userApi from './api/users';
import notesApi from './api/notes';
// database connections
import { pg } from './database/connection';
pg.connect();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(boom());

app.use(
  expressJwt({ secret: TOKEN_SIGN_KEY }).unless({
    path: [
      { url: '/api/create-user', methods: ['POST'] },
      { url: '/api/login', methods: ['POST'] },
    ],
  }),
);

app.use(checkExpireSession);
app.use(checkIsUuid);

app.use('/api', userApi);
app.use('/api/notes', notesApi);

app.use(errorIsJoi);

app.listen(PORT);

logger.info(`Listening on port: ${PORT}`);

process.on('unhandledRejection', (error: Error) => {
  logger.error(`unhandledRejection ${error.message}`);
  logger.error(`unhandledRejection ${error.stack}`);
});

process.on('uncaughtException', (error: Error) => {
  logger.error(`uncaughtException ${error.message}`);
});
