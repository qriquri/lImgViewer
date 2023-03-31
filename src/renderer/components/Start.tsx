import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IApp } from '../state/IApp';
import { IState } from '../state/IState';
import { AppBar } from './AppBar';
import * as AppTheme from './style/AppTheme';
import styles from './style/Start.module.css';
import { TitleBar } from './TitleBar';
import { Viewer } from './Viewer';

export const Start: React.FC = () => {
  const { theme } = useSelector<IState, IApp>(a => a.app);
  const appTheme = useMemo(() => {
    if (theme === 'dark') {
      return createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: AppTheme.oneDark.primary.main,
            contrastText: AppTheme.oneDark.primary.contrastText,
          },
          secondary: { ...AppTheme.oneDark.secondary },
          action: { ...AppTheme.oneDark.action },
        },
      });
    } else {
      return createTheme({
        palette: {
          mode: 'light',
          secondary: { ...AppTheme.oneLight.secondary },
        },
      });
    }
  }, [theme]);
  return (
    <React.Fragment>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <TitleBar />
        <AppBar />
        <Box className={styles.contents}>
          {/* <SideBar /> */}
          {/* <Player /> */}
          <Viewer />
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};
