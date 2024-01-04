import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slices/toastSlice';
import promptReducer from './slices/promptSlice';
import simpleModalsReducer from './slices/simpleModalsSlice';
import innerWindowSizeReducer from './slices/innerWindowSizeSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    prompt: promptReducer,
    simpleModals: simpleModalsReducer,
    innerWindowSize: innerWindowSizeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
