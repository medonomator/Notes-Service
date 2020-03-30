interface IError {
  error: string | null;
}

export interface Note {
  id: string;
  title: string;
  shareLink: string;
  refresh_token: string;
  is_share_note: boolean;
  body: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface IResponse extends Note, IError {}

export type IResCreateNote = IResponse | IError;
