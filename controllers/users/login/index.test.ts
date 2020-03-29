import { createUser } from './';

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(res => {
      return { catch: jest.fn(), rows: [{ id: 1 }] };
    }),
    catch: jest.fn(),
  })),
}));

jest.mock('../../../helpers', () => {
  return {
    encryptData: jest.fn(() => '1234'),
    prepareTokens: jest.fn(({ login }) => {
      if (login === 'test') {
        return {
          token: 'token',
          expiresIn: 600,
        };
      } else {
        throw new Error('Custom Error');
      }
    }),
  };
});

describe('Testing successful response', () => {
  test('create new user', async () => {
    const res = <any>await createUser('test', '1234');

    expect(res).toHaveProperty('token');
    expect(res).toHaveProperty('refreshToken');
    expect(res).toHaveProperty('expiresIn');
    expect(res).toHaveProperty('error');

    expect(res.expiresIn).toEqual(600);
    expect(res.error).toBe(null);
  });
});

describe('Error handling', () => {
  test('Error in the creation process', async () => {
    const res = <any>await createUser('E', 'E');
    expect(res).toHaveProperty('error');
    expect(res.error).toEqual('Custom Error');
  });
});
