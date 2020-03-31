import { deleteNote } from './';

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(() => {
      return { catch: jest.fn(), rows: [{ id: 1 }] };
    }),
    catch: jest.fn(),
  })),
}));

jest.mock('../../../database/connection', () => {
  return {
    pgQuery: jest.fn((query, values) => {
      if (values.includes('1')) {
        return 'ok';
      }

      if (values.includes('E')) {
        throw new Error('Custom Error');
      }
    }),
  };
});

describe('Testing successful response', () => {
  test('Successful delete Note', async () => {
    const res = await deleteNote('1');
    expect(res).toBe('ok');
  });
});

describe('Error handling', () => {
  test('Error in the creation process', async () => {
    const res = <any>await deleteNote('E');

    expect(res).toHaveProperty('error');
    expect(res.error).toEqual('Custom Error');
  });
});
