interface IError {
  error: string | null;
}

export interface IParams extends IError {
  title: string;
  is_share_note: boolean;
  body: string;
  id: string;
}

export interface INote {
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

interface IResponse extends INote, IError {}

export type IResUpdateNote = IResponse | IError;
