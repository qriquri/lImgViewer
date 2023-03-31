import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { IState } from './state/IState';
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import AppSlice from './slice/AppSlice';
import ViewerSlice from './slice/ViewerSlice';
import ImgViewerSlice from './slice/ImgViewerSlice';

const rootReducer = combineReducers<IState>({
  app: AppSlice,
  viewer: ViewerSlice,
  imgViewer: ImgViewerSlice
});

// テストでは個別にストアを作りたいので
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore<IState>({
    reducer: { app: AppSlice, viewer: ViewerSlice, imgViewer: ImgViewerSlice },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }) as any,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
