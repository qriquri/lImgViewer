import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppTheme, IApp } from '../state/IApp';

const initialState: IApp = {
  theme: 'dark',
  isMax: false,
};

export const AppSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setIsMaxAction: (state: IApp, action: PayloadAction<boolean>) => {
      state.isMax = action.payload;
    },
    setThemeAction: (state: IApp, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setIsMaxAction, setThemeAction } = AppSlice.actions;
export default AppSlice.reducer;
