import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../features/redditPostSlice/redditPostSlice'
import redditCommentsReducer from '../features/redditCommentsSlice/redditCommentsSlice';

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
    redditComments: redditCommentsReducer
  },
});
