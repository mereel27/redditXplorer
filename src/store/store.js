import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditPost/redditPostSlice';
import redditCommentsReducer from './redditComments/redditCommentsSlice';

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
    redditComments: redditCommentsReducer
  },
});
