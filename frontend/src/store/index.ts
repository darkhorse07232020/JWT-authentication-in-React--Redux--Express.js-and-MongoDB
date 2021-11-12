import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './error-handling';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
