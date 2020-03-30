import { Response } from 'express';
import { IParams } from '../interfaces';

export const commonMiddleWare = (req: IParams, res: Response) => {
  if (req.result.error) {
    res.boom.badRequest(req.result.error);
  } else {
    res.send(req.result);
  }
};
