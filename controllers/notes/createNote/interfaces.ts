interface IError {
  error: string | null;
}

export interface Note {
  id: string;
  title: string;
  shareLink: string;
  refresh_token: string;
  isShareNote: boolean;
  body: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface IResponse extends Note, IError {}

export type IResCreateNote = IResponse | IError;
