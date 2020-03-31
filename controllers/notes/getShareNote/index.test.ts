import { getShareNote } from './';

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(() => {
      return { catch: jest.fn(), rows: [{ id: 1 }] };
    }),
    catch: jest.fn(),
  })),
}));

const note = {
  id: '1',
  title: 'title 1',
  body: 'body 1',
};

jest.mock('../../../database/connection', () => {
  return {
    pgQuery: jest.fn((query, values) => {
      if (values.includes('noteId')) {
        return note;
      }

      if (values.includes('E')) {
        throw new Error('Custom Error');
      }
    }),
  };
});

describe('Testing successful response', () => {
  test('Get share Note', async () => {
    const res = await getShareNote('noteId');

    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('title');
    expect(res).toHaveProperty('body');
    expect(res).toMatchObject(note);
  });
});

describe('Error handling', () => {
  test('Error in the creation process', async () => {
    const res = <any>await getShareNote('E');

    expect(res).toHaveProperty('error');
    expect(res.error).toEqual('Custom Error');
  });
});
