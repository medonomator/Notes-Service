interface IError {
  error: string | null;
}

export interface INotes {
  id: string;
  title: string;
  share_link: string;
  is_share_note: boolean;
  body: string;
  user_id: string;
  created_at: Date;
  update_at: Date;
}

interface IResNotes extends IError {
  notes: INotes[];
}

export type IResponse = IResNotes | IError;
