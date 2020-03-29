import express, { Request, Response } from 'express';
import { createNote } from '../controllers/notes/createNote';
import { noteUserSchema } from './schemas';
const validator = require('express-joi-validation').createValidator({ passError: true });

const router = express.Router();

interface IParams extends Request {
  user: {
    userId: string;
  };
}

router.post('/', validator.body(noteUserSchema), async (req: IParams, res: Response) => {
  const { title, body } = req.body;
  const { userId } = req.user;

  const result = await createNote(title, body, userId);

  if (result.error) {
    res.boom.badRequest(result.error);
  }

  res.send(result);
});
router.get('/', () => {});
router.put('/:id', () => {});
router.delete('/:id', () => {});

router.put('/share-note', () => {});
router.get('/share-note/:id', () => {});

export default router;
