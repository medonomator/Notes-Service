import { createNote } from './';

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(() => {
      return { catch: jest.fn(), rows: [{ id: 1 }] };
    }),
    catch: jest.fn(),
  })),
}));

const getValues = (body: string) => ({
  title: 'title',
  body,
  userId: 'userId',
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
  test('create new note', async () => {
    const { title, body, userId } = getValues('body');
    const res = await createNote(title, body, userId);

    expect(res).toHaveProperty('title');
    expect(res).toHaveProperty('body');
    expect(res).toHaveProperty('userId');
    expect(res).toEqual(getValues('body'));
  });
});

describe('Error handling', () => {
  test('Error in the creation process', async () => {
    const { title, body, userId } = getValues('E');
    const res = await createNote(title, body, userId);

    expect(res).toHaveProperty('error');
    expect(res.error).toEqual('Custom Error');
  });
});
