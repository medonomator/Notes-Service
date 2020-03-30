import express, { Response } from 'express';
import { createNote } from '../controllers/notes/createNote';
import { getNotes } from '../controllers/notes/getNotes';
import { updateNote } from '../controllers/notes/updateNote';
import { noteUserSchema, noteUpdateSchema } from './schemas';
import { IParams } from '../interfaces';
const validator = require('express-joi-validation').createValidator({ passError: true });

const router = express.Router();
// Create Note
router.post('/', validator.body(noteUserSchema), async (req: IParams, res: Response) => {
  const { title, body } = req.body;
  const { user_id } = req.user;

  const result = await createNote(title, body, user_id);

  if (result.error) {
    res.boom.badRequest(result.error);
  } else {
    res.send(result);
  }
});
// Get Notes
router.get('/', async (req: IParams, res: Response) => {
  const { user_id } = req.user;

  const result: any = await getNotes(user_id);
  if (result.error) {
    res.boom.badRequest(result.error);
  } else {
    res.send(result);
  }
});

router.put('/', validator.body(noteUpdateSchema), async (req: IParams, res: Response) => {
  const result = await updateNote({ ...req.body, user_id: req.user.user_id });

  if (result.error) {
    res.boom.badRequest(result.error);
  } else {
    res.send(result);
  }
});

router.delete('/:id', () => {});

router.put('/share-note', () => {});
router.get('/share-note/:id', () => {});

export default router;
