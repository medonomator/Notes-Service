import { updateNote } from './';

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(() => {
      return { catch: jest.fn(), rows: [{ id: 1 }] };
    }),
    catch: jest.fn(),
  })),
}));

const getRequst = (user_id: string) => ({
  title: 'title',
  is_share_note: true,
  body: 'body',
  user_id,
});

const note = {
  id: '1',
  title: 'title 1',
  share_link: 'share_link 1',
  is_share_note: false,
  body: 'body 1',
  user_id: 'user_id',
  created_at: 'created_at',
  update_at: 'update_at',
};

jest.mock('../../../database/connection', () => {
  return {
    pgQuery: jest.fn((query, values) => {
      if (values.includes('user_id')) {
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
    const res = await updateNote(getRequst('user_id') as any);
    expect(res).toMatchObject(note);
  });
});

describe('Error handling', () => {
  test('Error in the creation process', async () => {
    const res = <any>await updateNote(getRequst('E') as any);

    expect(res).toHaveProperty('error');
    expect(res.error).toEqual('Custom Error');
  });
});
