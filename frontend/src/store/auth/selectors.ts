import type { RootState } from 'store';

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;
export const selectAuthStatus = (state: RootState) => selectAuth(state).status;
export const selectAuthMessage = (state: RootState) => selectAuth(state).message;
export const selectCurrentUser = (state: RootState) => selectAuth(state).data;
export const selectUserIsLogin = (state: RootState) => {
  const user = selectAuth(state).data;
  if (!user) return false;
  return true;
};
