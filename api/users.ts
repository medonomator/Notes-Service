import express, { Request, Response } from 'express';
import { createUser } from '../controllers/users/createUser';
import { unloginUser } from '../controllers/users/unloginUser';
import { createUserSchema } from './schemas';
const validator = require('express-joi-validation').createValidator({ passError: true });

const router = express.Router();

router.post('/create-user', validator.body(createUserSchema), async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const result = await createUser(login, password);

  if (result.error) {
    res.boom.badRequest(result.error);
  }

  res.send(result);
});
router.post('/unlogin-user', unloginUser);

export default router;
