import express from 'express';
import { createNote } from '../controllers/notes/createNote';
import { getNotes } from '../controllers/notes/getNotes';
import { updateNote } from '../controllers/notes/updateNote';
import { deleteNote } from '../controllers/notes/deleteNote';
import { getShareNote } from '../controllers/notes/getShareNote';
import { noteUserSchema, noteUpdateSchema } from './schemas';
import { IParams, TypeIError } from '../interfaces';
import { commonMiddleWare } from '../helpers/middlewares';
const validator = require('express-joi-validation').createValidator({ passError: true });

const router = express.Router();
// Create Note
router.post(
  '/',
  validator.body(noteUserSchema),
  async (req: IParams<TypeIError>, _, next) => {
    const { title, body } = req.body;
    const { user_id } = req.user;

    req.result = await createNote(title, body, user_id);
    next();
  },
  commonMiddleWare,
);
// Get Notes
router.get(
  '/',
  async (req: IParams<TypeIError>, _, next) => {
    req.result = await getNotes(req.user.user_id);
    next();
  },
  commonMiddleWare,
);
// Update Note
router.put(
  '/',
  validator.body(noteUpdateSchema),
  async (req: IParams<TypeIError>, _, next) => {
    req.result = await updateNote({ ...req.body, user_id: req.user.user_id });
    next();
  },
  commonMiddleWare,
);
// Delete Note
router.delete(
  '/:id',
  async (req: IParams<TypeIError>, _, next) => {
    req.result = await deleteNote(req.params.id);
    next();
  },
  commonMiddleWare,
);
// Get Share Note
router.get(
  '/share-note/:id',
  async (req: IParams<TypeIError>, _, next) => {
    req.result = await getShareNote(req.params.id);
    next();
  },
  commonMiddleWare,
);

export default router;
