import { redisClient } from '../database/redis';
import { IParams, TypeIError } from '../interfaces';
import { logger } from '../helpers/logger';

export const checkExpireSession = async (req: IParams<TypeIError>, res, next) => {
  if (req.user) {
    try {
      const { user_id } = req.user;
      const isBlock = await redisClient.get(user_id);

      if (isBlock) {
        res.boom.unauthorized('Your session is expired');
      } else {
        next();
      }
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  } else {
    next();
  }
};
