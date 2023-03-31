import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { IViewer } from '../../state/IViewer';
import { IState } from '../../state/IState';

const LOG_TAG = 'FilePath';

/**
 *
 * @return {JSX.Element}
 */
export const FilePath: React.FC = () => {
  const {item, playingIndex} = useSelector<IState, IViewer>(a => a.viewer);  

  console.log(LOG_TAG, 'rendering');
  return (
    <Typography
      variant="caption"
      color="secondary.contrastText"
      component="p"
      sx={{ lineHeight: '3rem', marginLeft: '0.5rem' }}>
      {item[playingIndex].name}
    </Typography>
  );
};
