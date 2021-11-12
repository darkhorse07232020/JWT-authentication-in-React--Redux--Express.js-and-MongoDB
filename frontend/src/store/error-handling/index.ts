import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ErrorState, IError } from './types';

const PREFIX = 'errors';

const initialState: ErrorState = {
  errors: [],
  mapping: {},
};

export const errorsSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setError(state, action: PayloadAction<IError>) {
      state.errors.push(action.payload);
    },
    setMappingError(state, action: PayloadAction<IError>) {
      const { id, text, code } = action.payload;
      state.mapping[id] = { code, message: text };
    },
    removeFirstError(state) {
      state.errors.shift();
    },
    removeErrorById(state, action) {
      const id = action.payload;
      state.errors = state.errors.filter(item => item.id !== id);
    },
    removeErrorByKey(state, action) {
      const key = action.payload;
      if (state.mapping[key]) {
        delete state.mapping[key];
      }
    },
  },
});

const { setError, setMappingError, removeFirstError, removeErrorById, removeErrorByKey } = errorsSlice.actions;

export const setErrorByType = (thunkApi: any, text: string, code: number, key: string) => {
  thunkApi.dispatch(setMappingError({ id: key, text, code }));
  setTimeout(() => thunkApi.dispatch(removeErrorByKey(key)), 1000);
};

export type { ErrorState, IError };

export { setError, removeFirstError, removeErrorById };

export default errorsSlice.reducer;
