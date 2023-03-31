import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Slider } from '@mui/material';
import { IState } from '../../state/IState';
import { IViewer } from '../../state/IViewer';
import { setPlayingIndex } from '../../slice/ViewerSlice';
const LOG_TAG = 'ItemSlider';

/**
 *
 * @return {JSX.Element}
 */
export const ItemSlider: React.FC = () => {
  const { item, playingIndex } = useSelector<IState, IViewer>(a => a.viewer);
  const dispatch = useDispatch();
  // <コールバック関数>
  const handleSliderChange = useCallback(
    (event: Event, value: number | number[]) => {
      if (typeof value === 'number') {
        dispatch(setPlayingIndex(value));
      }
    },
    [item],
  );
  // </コールバック関数>

  console.log(LOG_TAG, 'rendering');
  return (
    <Box sx={{width: '100%', height: '100%', lineHeight: '3rem'}}>
      <Slider
        step={1}
        min={0}
        max={Object.keys(item).length - 1}
        value={playingIndex}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        sx={{ width: '100%', textAlign: 'right', padding: '0' }}
      />
    </Box>
  );
};
