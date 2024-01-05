import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { Modal } from '@/types';

const initialState: Modal = { title: '', isOpen: false, buttonLabel: '' };

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    updateToast: (state, action: PayloadAction<Modal>) => {
      state = action.payload;
    }
  }
});

export const { updateToast } = toastSlice.actions;
export default toastSlice.reducer;
