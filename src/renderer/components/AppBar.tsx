import React, { useCallback, useMemo } from 'react';
import { Box, Typography, Grid, IconButton, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RefreshIcon from '@mui/icons-material/Refresh';
// import './styles/animation.css';
import styles from './style/AppBar.module.css';
import { FilePath } from './AppBar/FilePath';
import { ItemSlider } from './AppBar/ItemSlider';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../state/IState';
import { IApp } from '../state/IApp';
import { setThemeAction } from '../slice/AppSlice';
import { IViewer } from '../state/IViewer';

const LOG_TAG = 'AppBar';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const ThemeSwitch: React.FC = () => {
  const { theme } = useSelector<IState, IApp>(a => a.app);
  const [checked, setChecked] = React.useState(theme === 'dark');
  const dispatch = useDispatch();
  const switchTheme = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      if (event.target.checked) {
        dispatch(setThemeAction('dark'));
      } else {
        dispatch(setThemeAction('light'));
      }
    },
    [],
  );
  return (
    <MaterialUISwitch
      sx={{
        position: 'absolute',
        top: '10px',
        right: '12px',
      }}
      checked={checked}
      onChange={switchTheme}
    />
  );
};

const OpFolderButton: React.FC = () => {
  const openFolder = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    window.electronAPI.sendMsg('open-dir-req');
  }, []);
  return (
    <IconButton
      // color="inherit"
      aria-label="open"
      onClick={e => openFolder(e)}
      sx={{
        position: 'absolute',
        top: '10px',
        right: '80px',
        width: '30px',
        height: '30px',
      }}>
      <FolderOpenIcon sx={{ color: `action.active` }} />
    </IconButton>
  );
};

const ReLoadButton: React.FC = () => {
  // const { dirPath } = useSelector<IState, IViewer>(a => a.viewer);
  const { item, playingIndex } = useSelector<IState, IViewer>(a => a.viewer);
  const reLoadFolder = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // if (dirPath === '') {
    //   return;
    // }
    window.electronAPI.sendMsg('re-open-folder-req', item[playingIndex].path);
  }, [item, playingIndex]);
  return (
    <IconButton
      // color="inherit"
      aria-label="open"
      onClick={e => reLoadFolder(e)}
      sx={{
        position: 'absolute',
        top: '10px',
        right: '115px',
        width: '30px',
        height: '30px',
      }}>
      <RefreshIcon sx={{ color: `action.active` }} />
    </IconButton>
  );
};

/**
 *
 * @return {JSX.Element}
 */
export const AppBar: React.FC = () => {
  // <コールバック関数>
  // </コールバック関数>
  // <メモ化したコンポーネント>
  // </メモ化したコンポーネント>
  // const dir = React.useMemo(() => {
  //   return vPath;
  // }, [vPath]);
  console.log(LOG_TAG, 'rendering');
  return (
    <Box
      className={styles.container}
      sx={{
        // bgcolor: 'secondary.contrastText',
        bgcolor: `secondary.dark`,
        zIndex: 'appBar',
      }}>
      <Grid container spacing={2} columns={20}>
        <Grid className="" item xs={9} sx={{}}>
          <FilePath />
        </Grid>
        <Grid item xs={7}>
          <ItemSlider />
        </Grid>
        <Grid item xs={3}>
          <ReLoadButton />
          <OpFolderButton />
          <ThemeSwitch />
        </Grid>
      </Grid>
    </Box>
  );
};
