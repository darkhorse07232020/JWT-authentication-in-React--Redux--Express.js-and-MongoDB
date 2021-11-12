import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import STATUSES from 'constants/redux';
import { loginUser, registerUser, logOutUser, autoLoginUser, loginGoogle } from './actions';
import type { UserState } from './types';

const PREFIX = 'user';

const initialState: UserState = {
  status: STATUSES.INITIAL,
  data: null,
  message: null,
};

const isPendingAction = (action: Action): boolean =>
  action.type.startsWith(`${PREFIX}/`) && action.type.endsWith('pending');

const isRejectionAction = (action: Action) => action.type.startsWith(`${PREFIX}/`) && action.type.endsWith('rejected');

const setCredentials = (state: UserState, user: UserInfo) => {
  state.data = user;
};

const setRegisteredMessage = (state: UserState, message: string) => {
  state.message = message;
};

const resetData = (state: UserState) => {
  state.status = STATUSES.INITIAL;
  state.data = null;
  state.message = null;
};

export const userSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled.type, (state: UserState, action: PayloadAction<UserInfo>) => {
        state.status = STATUSES.FULFILLED;
        setCredentials(state, action.payload);
      })
      .addCase(loginGoogle.fulfilled.type, (state: UserState, action: PayloadAction<UserInfo>) => {
        state.status = STATUSES.FULFILLED;
        setCredentials(state, action.payload);
      })
      .addCase(autoLoginUser.fulfilled.type, (state: UserState, action: PayloadAction<UserInfo>) => {
        state.status = STATUSES.FULFILLED;
        setCredentials(state, action.payload);
      })
      .addCase(logOutUser.fulfilled.type, (state: UserState) => {
        resetData(state);
      })
      .addCase(registerUser.fulfilled.type, (state: UserState, action: PayloadAction<string>) => {
        state.status = STATUSES.FULFILLED;
        setRegisteredMessage(state, action.payload);
      })
      .addMatcher(isPendingAction, (state: UserState) => {
        state.status = STATUSES.PENDING;
      })
      .addMatcher(isRejectionAction, (state: UserState) => {
        state.status = STATUSES.REJECTED;
        resetData(state);
      });
  },
});

export { loginUser, registerUser, autoLoginUser };

export default userSlice.reducer;
