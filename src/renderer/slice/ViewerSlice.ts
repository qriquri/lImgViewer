import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFileInfo } from '../../common/IFileInfo';
import { IViewer } from '../state/IViewer';

const initialState: IViewer = {
  playingIndex: 0,
  isPlaying: false,
  duration: 0,
  item: {0: {path: './assets/NoContents.png', name: 'NoContents.png',stats: {} as any}},
};

export const ViewerSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setPlayingIndex: (state: IViewer, action: PayloadAction<number>) => {
      console.log(action.payload);
      if (Object.keys(state.item).length <= action.payload) {
        state.playingIndex = 0;
      } else if (action.payload < 0) {
        state.playingIndex = Object.keys(state.item).length - 1;
      } else {
        state.playingIndex = action.payload;
      }
    },
    setIsPlaying: (state: IViewer, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setDuration: (state: IViewer, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setItem: (state: IViewer, action: PayloadAction<IFileInfo[]>) => {
      state.item = {};
      action.payload.map((payload, index) => {
        state.item[index] = payload;
      });
    },
  },
});

export const { setPlayingIndex, setIsPlaying, setDuration, setItem } =
  ViewerSlice.actions;
export default ViewerSlice.reducer;
