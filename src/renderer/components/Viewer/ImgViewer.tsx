import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../state/IState';
import { IImgViewer, IViewer } from '../../state/IViewer';
import { store } from '../../Store';
import {
  setScale,
  setTranslate,
  setSize,
  setFlip,
  setRotate,
} from '../../slice/ImgViewerSlice';
const LOG_TAG = 'ImgViewer';

interface IProps {
  width: number;
  height: number;
}

document.addEventListener('keydown', keydownEvent);
/**
 *
 * @param {any} e
 * @return {boolean}
 */
function keydownEvent(e: KeyboardEvent): boolean {
  // console.log(e.key);
  const { scale, translate, rotate, flip } = store.getState().imgViewer;
  console.log(scale, translate, rotate, flip);
  const offsetScale = 0.1;
  const offsetTranslate = 10.0;
  const offsetRotate = 90.0;
  if (e.key === ';') {
    store.dispatch(setScale(scale + offsetScale));
    console.log(LOG_TAG, 'zoom');
  } else if (e.key === '-') {
    store.dispatch(setScale(scale - offsetScale));
    console.log(LOG_TAG, 'small', scale);
  }
  if (e.key === 'w') {
    store.dispatch(
      setTranslate({ x: translate.x, y: translate.y - offsetTranslate }),
    );
  } else if (e.key === 's') {
    store.dispatch(
      setTranslate({ x: translate.x, y: translate.y + offsetTranslate }),
    );
  }
  if (e.key === 'd') {
    store.dispatch(
      setTranslate({ x: translate.x + offsetTranslate, y: translate.y }),
    );
  } else if (e.key === 'a') {
    store.dispatch(
      setTranslate({ x: translate.x - offsetTranslate, y: translate.y }),
    );
  }
  if (e.key === 'f') {
    if (e.ctrlKey) {
      store.dispatch(setFlip({ x: flip.x, y: !flip.y }));
    } else {
      store.dispatch(setFlip({ x: !flip.x, y: flip.y }));
    }
  }
  if (e.key === 't') {
    if (e.ctrlKey) {
      store.dispatch(setRotate(rotate - offsetRotate));
    } else {
      store.dispatch(setRotate(rotate + offsetRotate));
    }
  }
  return false;
}

export const ImgViewer: React.FC<IProps> = props => {
  const { scale, size, translate, rotate, flip } = useSelector<
    IState,
    IImgViewer
  >(a => a.imgViewer);
  const { item, playingIndex } = useSelector<IState, IViewer>(a => a.viewer);
  const [loadingIdx, setLoadingIdx] = useState(playingIndex);
  const dispatch = useDispatch();
  // <viewerに表示する画像や動画>
  const displaySize = useMemo(() => {
    let width =
      size.width > size.height
        ? props.width
        : (props.height * size.width) / size.height;
    let height =
      size.width > size.height
        ? (props.width * size.height) / size.width
        : props.height;

    // 1倍の時のはみだし防止
    if (width <= height) {
      if (props.width < width) {
        width *= props.width / width;
        height *= props.width / width;
      }
    } else {
      if (props.height < height) {
        width *= props.height / height;
        height *= props.height / height;
      }
    }
    return {
      width: width * scale,
      height: height * scale,
    };
  }, [props.width, props.height, size, scale]);
  // </viewerに表示する画像や動画>
  // <callback>
  // </callback>
  useEffect(() => {
    const img = new Image();
    img.src = item[playingIndex].path;
    setLoadingIdx(playingIndex);
    img.onload = () => {
      if (store.getState().viewer.playingIndex === loadingIdx) {
        console.log(
          'img',
          img.width,
          img.height,
          item[playingIndex].path,
          playingIndex,
          loadingIdx,
        );
        dispatch(setTranslate({ x: 0, y: 0 }));
        dispatch(setScale(1.0));
        dispatch(setRotate(0));
        dispatch(setFlip({ x: false, y: false }));
        dispatch(setSize({ width: img.width, height: img.height }));
      }
    };
  }, [item, playingIndex, loadingIdx]);

  console.log(LOG_TAG, 'rendering Viewer');
  return (
    <img
      src={item[playingIndex].path}
      width={displaySize.width}
      height={displaySize.height}
      style={{
        transform: `translate3d(${
          (props.width - displaySize.width) / 2 + translate.x
        }px, ${
          (props.height - displaySize.height) / 2 + translate.y
        }px, 0) scale(${flip.x ? -1 : 1}, ${
          flip.y ? -1 : 1
        }) rotate(${rotate}deg)`, // TODO: 横に長いイラストとかは回転させるとはみ出てしまう
        // transformOrigin: 'center' //多分いらない
      }}
    />
    // <Stage width={props.width} height={props.height} >
    //   <Sprite
    //     image={item[playingIndex].path}
    //     anchor={0.5}
    //     width={
    //       displaySize.width
    //     }
    //     height={
    //       displaySize.height
    //     }
    //     x={props.width / 2+translate.x}
    //     y={props.height / 2+translate.y}
    //   />
    // </Stage>
  );
};
