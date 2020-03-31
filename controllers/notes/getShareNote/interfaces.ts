interface IError {
  error: string | null;
}

export interface INote extends IError {
  id: string;
  title: string;
  body: string;
}

export type IResponse = INote | IError;
