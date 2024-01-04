import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InnerWindowSize = { width: number; height: number };

const initialState: InnerWindowSize = { width: 0, height: 0 };

const innerWindowSizeSlice = createSlice({
  name: 'innerWindowSize',
  initialState,
  reducers: {
    updateSizes: (state, action: PayloadAction<InnerWindowSize>) => {
      state = { width: action.payload.width, height: action.payload.height };
    }
  }
});

export const { updateSizes } = innerWindowSizeSlice.actions;
export default innerWindowSizeSlice.reducer;
