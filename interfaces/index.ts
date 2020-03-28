// common interfaces

export interface ITokens {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IPrepareTokensParams {
  userId: string;
  login: string;
}
