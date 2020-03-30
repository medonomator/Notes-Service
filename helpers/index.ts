import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { TOKEN_SIGN_KEY, REFRESH_TOKEN_SIGN_KEY, SECRET_KEY } from '../constants';
import { ITokens, IPrepareTokensParams } from '../interfaces';

export const prepareTokens = (obj: IPrepareTokensParams): ITokens => {
  const tokenExpirationSeconds = 60 * 60 * 24; // 1 day for test
  const refreshTokenExpirationSeconds = 60 * 60 * 24 * 7; // week

  return {
    token: jwt.sign(
      {
        user_id: obj.user_id,
        login: obj.login,
        tokenSignKey: TOKEN_SIGN_KEY,
      },
      TOKEN_SIGN_KEY,
      {
        algorithm: 'HS256',
        expiresIn: tokenExpirationSeconds,
      },
    ),
    refreshToken: jwt.sign(
      {
        user_id: obj.user_id,
        refresh: true,
        tokenSignKey: REFRESH_TOKEN_SIGN_KEY,
      },
      REFRESH_TOKEN_SIGN_KEY,
      {
        algorithm: 'HS256',
        expiresIn: refreshTokenExpirationSeconds,
      },
    ),
    expiresIn: tokenExpirationSeconds,
  };
};

export const encryptData = (str: string, secretKey = SECRET_KEY) => {
  return crypto
    .createHmac('sha256', secretKey)
    .update(str)
    .digest('hex');
};
