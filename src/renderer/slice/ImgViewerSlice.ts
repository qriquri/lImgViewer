import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFileInfo } from '../../common/IFileInfo';
import { IImgViewer } from '../state/IViewer';

const initialState: IImgViewer = {
  size: { width: 0.1, height: 0.1 },
  scale: 1.0,
  maxScale: 10.0,
  minScale: 1.0,
  translate: { x: 0, y: 0 },
  flip: { x: false, y: false },
  rotate: 0.0,
};

export const ImgViewerSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setSize: (
      state: IImgViewer,
      action: PayloadAction<{ width: number; height: number }>,
    ) => {
      console.log(action.payload);
      state.size = action.payload;
    },
    setScale: (state: IImgViewer, action: PayloadAction<number>) => {
      if (
        state.minScale <= action.payload &&
        action.payload <= state.maxScale
      ) {
        state.scale = action.payload;
      }
    },
    setTranslate: (
      state: IImgViewer,
      action: PayloadAction<{ x: number; y: number }>,
    ) => {
      state.translate = action.payload;
    },
    setFlip: (
      state: IImgViewer,
      action: PayloadAction<{ x: boolean; y: boolean }>,
    ) => {
      state.flip = action.payload
    },
    setRotate: (state: IImgViewer, action: PayloadAction<number>) => {
      if(action.payload < 0){
        action.payload = (-1 * action.payload) + 180.0
      }
      state.rotate = action.payload % 360.0;
    },
  },
});

export const { setScale, setSize, setTranslate, setFlip, setRotate } = ImgViewerSlice.actions;
export default ImgViewerSlice.reducer;
