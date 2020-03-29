import express, { Request, Response } from 'express';
import { createUser } from '../controllers/users/createUser';
import { unloginUser } from '../controllers/users/unloginUser';
import { userLogin } from '../controllers/users/login';
import { userSchema } from './schemas';
import { IParams } from '../interfaces';
const validator = require('express-joi-validation').createValidator({ passError: true });

const router = express.Router();

router.post('/create-user', validator.body(userSchema), async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const result = await createUser(login, password);

  if (result.error) {
    res.boom.badRequest(result.error);
  } else {
    res.send(result);
  }
});

router.post('/login', validator.body(userSchema), async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const result = await userLogin(login, password);

  if (result.error) {
    res.boom.badRequest(result.error);
  } else {
    res.send(result);
  }
});

router.post('/unlogin-user', async (req: IParams, res: Response) => {
  const { login, userId } = req.user;

  const result = await unloginUser(login, userId);

  if (result.error) {
    res.boom.badRequest(result.error);
  } else {
    res.send(result);
  }
});

export default router;
