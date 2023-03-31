import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IState } from '../state/IState';
import { IViewer } from '../state/IViewer';
import styles from './style/Viewer.module.css';
import { setPlayingIndex } from '../slice/ViewerSlice';
import { store } from '../Store';
import { ImgViewer } from './Viewer/ImgViewer';
import { useGetElementProperty } from './hooks/GetElementProperty';
const LOG_TAG = 'Viewer';

// const slideLeft = ['anim-box', 'revSlidein', 'is-animated'];
// const slideRight = ['anim-box', 'slidein', 'is-animated'];

document.addEventListener('keydown', keydownEvent);
/**
 * キーボードでも画像切り替えができるようにする
 * @param {any} e
 * @return {boolean}
 */
function keydownEvent(e: any): boolean {
  // console.log(e.key);
  const { playingIndex } = store.getState().viewer;
  if (e.key === 'ArrowRight') {
    store.dispatch(setPlayingIndex(playingIndex + 1));
    console.log(LOG_TAG, 'forward');
  } else if (e.key === 'ArrowLeft') {
    store.dispatch(setPlayingIndex(playingIndex - 1));
    console.log(LOG_TAG, 'back');
  }
  return false;
}

/**
 * ファイルの拡張子が動画ファイルかどうかを見極める
 * @param {string} fileName
 * @return {boolean}
 */
function isVideoExt(fileName: string): boolean {
  fileName = fileName.substring(fileName.lastIndexOf('.'));
  if (fileName.toUpperCase().match(/\.(mp4)$/i)) {
    return true;
  }
  if (fileName.toUpperCase().match(/\.(avi)$/i)) {
    return true;
  }
  if (fileName.toUpperCase().match(/\.(fiv)$/i)) {
    return true;
  }
  if (fileName.toUpperCase().match(/\.(mov)$/i)) {
    return true;
  }
  if (fileName.toUpperCase().match(/\.(wmv)$/i)) {
    return true;
  }
  return false;
}

export const Viewer: React.FC = () => {
  const dispatch = useDispatch();
  const { item, playingIndex } = useSelector<IState, IViewer>(a => a.viewer);
  const contentsArea = useRef(null);
  const {getSelectedElementProperty} = useGetElementProperty<HTMLDivElement>(contentsArea);
  // <viewerに表示する画像や動画>
  const contents = !isVideoExt(item[playingIndex].path) ? (
    <ImgViewer width={getSelectedElementProperty("width")} height={getSelectedElementProperty("height")}/>
  ) : (
    <div style={{width: '100%', height: '100%', textAlign: 'center'}}>
    <video
      controls
      autoPlay
      muted
      loop
      src={item[playingIndex].path}
      style={{
        height: '100%', // TODO: 横に長いやつはウィンドウが小さいとはみ出てしまう
        width: 'auto',
        display: `${isVideoExt(item[playingIndex].path) ? '' : 'none'}`, // imgのときは隠す。
      }}></video>
      </div>
  );
  // </viewerに表示する画像や動画>
  // <callback>
  const back = useCallback(() => {
    dispatch(setPlayingIndex(playingIndex - 1));
    console.log(LOG_TAG, 'back');
  }, [playingIndex]);
  const forward = useCallback(() => {
    dispatch(setPlayingIndex(playingIndex + 1));
    console.log(LOG_TAG, 'forward');
  }, [playingIndex]);
  // </callback>
  console.log(LOG_TAG, 'rendering Viewer');
  useEffect(() => {
    console.log('height', getSelectedElementProperty('height'));
    // console.log('width', getSelectedElementProperty('width'));
    // console.log('x', getSelectedElementProperty('x'));
    // console.log('y', getSelectedElementProperty('y'));
    // console.log('top', getSelectedElementProperty('top'));
    // console.log('right', getSelectedElementProperty('right'));
    // console.log('bottom', getSelectedElementProperty('bottom'));
    // console.log('left', getSelectedElementProperty('left'));
  }, []);
  return (
    <Box className={styles.container}>
      <Box className={styles.backArrow}>
        <Button aria-label="back" onClick={back} sx={{ height: '100%' }}>
          <ArrowBackIcon
            sx={{
              color: `action.active`,
            }}
          />
        </Button>
      </Box>

      <Box
        className={styles.contents}
        ref={contentsArea}
        sx={{
          bgcolor: `secondary.main`,
          overflow: 'hidden',
        }}>
        {contents}
      </Box>
      <Box className={styles.forwardArrow}>
        <Button aria-label="forward" onClick={forward} sx={{ height: '100%' }}>
          <ArrowForwardIcon
            sx={{
              color: `action.active`,
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};
