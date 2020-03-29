// common interfaces
import { Request } from 'express';

export interface ITokens {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IPrepareTokensParams {
  userId: string;
  login: string;
}

export interface IParams extends Request {
  user: {
    userId: string;
    login: string;
  };
}
