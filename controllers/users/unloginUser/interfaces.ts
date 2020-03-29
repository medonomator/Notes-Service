interface IError {
  error: string | null;
}

interface IUpdate extends IError {
  update: 'ok';
}

export type IResponse = IUpdate | IError;
