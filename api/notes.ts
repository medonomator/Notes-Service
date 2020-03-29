import express, { Response } from 'express';
import { createNote } from '../controllers/notes/createNote';
import { noteUserSchema } from './schemas';
import { IParams } from '../interfaces';
const validator = require('express-joi-validation').createValidator({ passError: true });

const router = express.Router();

router.post('/', validator.body(noteUserSchema), async (req: IParams, res: Response) => {
  const { title, body } = req.body;
  const { userId } = req.user;

  const result = await createNote(title, body, userId);

  if (result.error) {
    res.boom.badRequest(result.error);
  } else {
    res.send(result);
  }
});

router.get('/', () => {});
router.put('/:id', () => {});
router.delete('/:id', () => {});

router.put('/share-note', () => {});
router.get('/share-note/:id', () => {});

export default router;
