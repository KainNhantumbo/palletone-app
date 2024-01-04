import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SimpleModals = { isAboutModal: boolean };

const initialState: SimpleModals = { isAboutModal: false };

const simpleModalsSlice = createSlice({
  name: 'simpleModals',
  initialState,
  reducers: {
    updateAboutModal: (state, action: PayloadAction<boolean>) => {
      state.isAboutModal = action.payload;
    }
  }
});

export const { updateAboutModal } = simpleModalsSlice.actions;
export default simpleModalsSlice.reducer;
