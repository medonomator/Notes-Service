// common interfaces
import { Request } from 'express';

export interface IError {
  error: string | null;
}

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
  result: string | object | IError;
}
