import { getNotes } from './';

jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(() => {
      return { catch: jest.fn(), rows: [{ id: 1 }] };
    }),
    catch: jest.fn(),
  })),
}));

const notes = [
  {
    id: '1',
    title: 'title 1',
    share_link: 'share_link 1',
    is_share_note: false,
    body: 'body 1',
    user_id: 'user_id',
    created_at: 'created_at',
    update_at: 'update_at',
  },
  {
    id: '2',
    title: 'title 2',
    share_link: 'share_link 2',
    is_share_note: false,
    body: 'body 2',
    user_id: 'user_id',
    created_at: 'created_at',
    update_at: 'update_at',
  },
  {
    id: '3',
    title: 'title 3',
    share_link: 'share_link 2',
    is_share_note: false,
    body: 'body 3',
    user_id: 'user_id',
    created_at: 'created_at',
    update_at: 'update_at',
  },
];

const responseNotes = { notes, error: null };

jest.mock('../../../database/connection', () => {
  return {
    pgQuery: jest.fn((query, values) => {
      if (values.includes('user_id')) {
        return notes;
      }

      if (values.includes('empty')) {
        return [];
      }

      if (values.includes('E')) {
        throw new Error('Custom Error');
      }
    }),
  };
});

describe('Testing successful response', () => {
  test('Get Notes by user_id', async () => {
    const res = await getNotes('user_id');
    expect(res).toEqual(responseNotes);
  });

  test('should return empty notes', async () => {
    const res = <any>await getNotes('empty');
    expect(res.notes.length).toBe(0);
  });
});

describe('Error handling', () => {
  test('Error in the creation process', async () => {
    const res = <any>await getNotes('E');

    expect(res).toHaveProperty('error');
    expect(res.error).toEqual('Custom Error');
  });
});
