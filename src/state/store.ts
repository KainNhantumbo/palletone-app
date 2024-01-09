import { configureStore } from '@reduxjs/toolkit';
import innerWindowSizeReducer from './slices/innerWindowSizeSlice';

export const store = configureStore({
  reducer: {
    innerWindowSize: innerWindowSizeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
