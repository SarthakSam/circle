import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice';
import metaInfoReducer from '../features/meta-info/metaInfoSlice';
import usersReducer from '../features/user-details/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    metaInfo: metaInfoReducer,
    users: usersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
