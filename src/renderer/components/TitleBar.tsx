import React, { useCallback, useMemo } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize } from '@fortawesome/free-regular-svg-icons/faWindowMinimize'; // <-- import styles to be used
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons/faWindowMaximize'; // <-- import styles to be used
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons/faWindowRestore'; // <-- import styles to be used
import { faWindowClose } from '@fortawesome/free-regular-svg-icons/faWindowClose'; // <-- import styles to be used
import styles from './style/TitleBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../state/IState';
import { setIsMaxAction } from '../slice/AppSlice';
import { IApp } from '../state/IApp';

const LOG_TAG = 'TitleBar';

const AppIcon: React.FC = () => {
  return (
    <img
      src="../assets/icon.png"
      style={{
        position: 'absolute',
        top: '0.5rem',
        left: '0.5rem',
        width: '1rem',
        height: '1rem',
      }}
    />
  );
};

const MinimizeButton: React.FC = () => {
  const click = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(LOG_TAG, 'minimize');
    window.electronAPI.sendMsg('minimize-win-req');
  }, []);
  return (
    <IconButton
      aria-label="minimize"
      onClick={e => click(e)}
      sx={{
        position: 'absolute',
        top: '0.5rem',
        left: '0rem',
        width: '1rem',
        height: '1rem',
      }}>
      <FontAwesomeIcon size="sm" icon={faWindowMinimize} />
    </IconButton>
  );
};
const ToggleMaxButton: React.FC = () => {
  const { isMax } = useSelector<IState, IApp>(a => a.app);
  const dispatch = useDispatch();
  const click = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      console.log(LOG_TAG, 'toggle max');
      if (isMax) {
        window.electronAPI.sendMsg('restore-win-req');
      } else {
        window.electronAPI.sendMsg('max-win-req');
      }
      dispatch(setIsMaxAction(!isMax));
    },
    [isMax],
  );
  return (
    <IconButton
      aria-label="maximize"
      onClick={e => click(e)}
      sx={{
        position: 'absolute',
        top: '0.5rem',
        left: '2rem',
        width: '1rem',
        height: '1rem',
      }}>
      <FontAwesomeIcon
        size="sm"
        icon={isMax ? faWindowRestore : faWindowMaximize}
      />
    </IconButton>
  );
};
const CloseButton: React.FC = () => {
  const click = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(LOG_TAG, 'close');
    window.electronAPI.sendMsg('close-app-req');
  }, []);
  return (
    <IconButton
      // color="inherit"
      aria-label="close"
      onClick={e => click(e)}
      sx={{
        position: 'absolute',
        top: '0.5rem',
        left: '4rem',
        width: '1rem',
        height: '1rem',
      }}>
      <FontAwesomeIcon size="sm" icon={faWindowClose} />
    </IconButton>
  );
};

/**
 *
 * @return {JSX.Element}
 */
export const TitleBar: React.FC = () => {
  // <コールバック関数>
  // </コールバック関数>
  // <メモ化したコンポーネント>
  const appIcon = useMemo(() => {
    return <AppIcon />;
  }, []);
  const windowControlButton = useMemo(() => {
    return (
      <Box
        display="inline-block"
        sx={{
          position: 'absolute',
          top: '0',
          right: '0rem',
          width: '6rem',
          height: '100%',
        }}>
        <MinimizeButton />
        <ToggleMaxButton />
        <CloseButton />
      </Box>
    );
  }, []);
  // </メモ化したコンポーネント>
  // const dir = React.useMemo(() => {
  //   return vPath;
  // }, [vPath]);
  console.log(LOG_TAG, 'rendering');
  return (
    <Box
      className={styles.container}
      sx={{
        bgcolor: `secondary.dark`,
        zIndex: 'drawer',
      }}>
      {appIcon}
      <Box
        className={styles.draggable}
        display="inline-block"
        sx={{ ml: '2rem', mt: '0.1rem', width: 'calc(100% - 9rem)' }}>
        <Typography
          variant="subtitle1"
          fontWeight={10}
          color="secondary.contrastText">
          LImgViewer
        </Typography>
      </Box>
      {windowControlButton}
    </Box>
  );
};
