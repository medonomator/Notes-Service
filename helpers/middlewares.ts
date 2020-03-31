import { Response } from 'express';
import { IParams, IError } from '../interfaces';
import { isUuid } from '../helpers';

export const commonMiddleWare = (req: IParams<IError>, res: Response) => {
  if (req.result.error) {
    res.boom.badRequest(req.result.error);
  } else {
    res.send(req.result);
  }
};

export const checkIsUuid = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const parseUrl = req.url.split('/');
    if (isUuid(parseUrl[parseUrl.length - 1])) {
      next();
    } else {
      res.boom.unauthorized('Unauthorized');
    }
  }
};

export const errorIsJoi = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.boom.badRequest(err.error.toString());
  } else {
    if (err.status === 401) {
      res.boom.unauthorized();
    }
    next(err);
  }
};
