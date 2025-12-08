import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';
import postsReducer from './slices/postsSlice';
import awardsReducer from './slices/awardsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    posts: postsReducer,
    awards: awardsReducer,
  },
});

export default store;
