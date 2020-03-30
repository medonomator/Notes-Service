// common interfaces
import { Request } from 'express';

export interface ITokens {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IPrepareTokensParams {
  user_id: string;
  login: string;
}

export interface IParams extends Request {
  user: {
    user_id: string;
    login: string;
  };
}
