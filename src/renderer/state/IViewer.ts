import { IFileInfo } from "../../common/IFileInfo";

export interface IFile {
  path: string;
}

export interface IViewer {
  playingIndex: number;
  isPlaying: boolean;
  duration: number;
  item: {
    [prop: number]: IFileInfo;
  };
}

export interface IImgViewer{
  size: {width: number, height: number};
  scale: number;
  maxScale: number;
  minScale: number;
  translate: {x: number, y: number};
  flip: {x: boolean, y: boolean};
  rotate: number; // deg
}