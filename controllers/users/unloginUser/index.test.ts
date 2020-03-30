import { unloginUser } from './';

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(res => {
      return { catch: jest.fn(), rows: [{ id: 1 }] };
    }),
    catch: jest.fn(),
  })),
}));

const getValues = (body: string) => ({
  title: 'title',
  body,
  user_id: 'user_id',
});

jest.mock('../../../database/connection', () => {
  return {
    pgQuery: jest.fn((query, values) => {
      if (values[2] === 'body') {
        return getValues('body');
      }

      if (values[2] === 'E') {
        throw new Error('Custom Error');
      }
    }),
  };
});

describe('Testing successful response', () => {
  test('create new user', async () => {
    const res = <any>await unloginUser('test', '1234');

    expect(res).toHaveProperty('update');
    expect(res).toHaveProperty('error');

    expect(res.update).toBe('ok');
    expect(res.error).toBe(null);
  });
});

describe('Error handling', () => {
  test('Error in the creation process', async () => {
    const res = <any>await unloginUser('E', 'E');
    expect(res).toHaveProperty('error');
    expect(res.error).toEqual('Custom Error');
  });
});
