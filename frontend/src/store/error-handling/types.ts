export type IError = {
  id: string;
  code: number;
  text: string;
};

interface ErrorState {
  errors: Array<IError>;
  mapping: { [key: string]: { code: number; message: string } };
}

export type { ErrorState };
