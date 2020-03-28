import { ITokens } from '../../../interfaces';

interface IError {
  error: string | null;
}

interface IResponse extends ITokens, IError {}

export type IResCreateUser = IResponse | IError;

export interface User {
  id: string;
  login: string;
  password: string;
  refresh_token: string;
}
