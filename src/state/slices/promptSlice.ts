import type { Modal } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Modal = { title: '', status: false, message: '' };

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    updatePrompt: (state, action: PayloadAction<Modal>) => {
      state = action.payload;
    }
  }
});

export const { updatePrompt } = promptSlice.actions;
export default promptSlice.reducer;
