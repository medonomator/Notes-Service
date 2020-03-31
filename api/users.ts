import express from 'express';
import { createUser } from '../controllers/users/createUser';
import { unloginUser } from '../controllers/users/unloginUser';
import { userLogin } from '../controllers/users/login';
import { userSchema } from './schemas';
import { IParams, TypeIError } from '../interfaces';
import { commonMiddleWare } from '../helpers/middlewares';
const validator = require('express-joi-validation').createValidator({ passError: true });

const router = express.Router();
// Create user
router.post(
  '/create-user',
  validator.body(userSchema),
  async (req: IParams<TypeIError>, _, next) => {
    const { login, password } = req.body;
    req.result = await createUser(login, password);
    next();
  },
  commonMiddleWare,
);
// Login user
router.post(
  '/login',
  validator.body(userSchema),
  async (req: IParams<TypeIError>, _, next) => {
    const { login, password } = req.body;
    req.result = await userLogin(login, password);
    next();
  },
  commonMiddleWare,
);
// Unlogin user
router.post(
  '/unlogin-user',
  async (req: IParams<TypeIError>, _, next) => {
    const { login, user_id } = req.user;
    req.result = await unloginUser(login, user_id);
    next();
  },
  commonMiddleWare,
);

export default router;
