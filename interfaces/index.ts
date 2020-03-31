// common interfaces
import { Request } from 'express';

export interface IError {
  error: string | null;
}

export type TypeIError = IError | string;

export interface ITokens {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IPrepareTokensParams {
  user_id: string;
  login: string;
}

export interface IParams<T> extends Request {
  user: {
    user_id: string;
    login: string;
  };
  result: T;
}
