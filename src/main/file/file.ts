import { BrowserWindow, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import { IFileInfo } from '../../common/IFileInfo';
import { isImg, isVideo } from '../util/util';

export const getFiles = (selectedFile?: string) => {
  let files: IFileInfo[] = [];
  if (!selectedFile) {
    const window = BrowserWindow.getFocusedWindow();
    if (window === null) {
      return { files: files, selectedIndex: 0 };
    }

    const file = dialog.showOpenDialogSync(window, {
      title: 'ファイル選択',
      properties: ['openFile', 'showHiddenFiles'],
      filters: [
        { name: 'img/video file', extensions: ['jpg', 'jpeg', 'png', 'webbp', 'mp4'] },
      ],
    });
    if(!file){
      // console.log(file)
      // キャンセルが押された場合
      return { files: files, selectedIndex: 0 };
    }
    selectedFile = file[0]
  }
  files = readFolder(path.dirname(selectedFile));
  // console.log('selectedFile', selectedFile);
  // console.log('files', files);
  let selectedIndex = 0;
  files.map((file, index) => {
    if (file.path === selectedFile) {
      selectedIndex = index;
    }
  });
  console.log(selectedIndex);
  return { files: files, selectedIndex: selectedIndex };
};

export const readFolder = (dirName: string) => {
  const files: IFileInfo[] = [];
  const dir = fs.readdirSync(dirName);
  for (const file of dir) {
    if (isImg(file) || isVideo(file)) {
      files.push({
        path: path.join(dirName, file),
        name: file,
        stats: fs.statSync(path.join(dirName, file)),
      });
    }
  }
  return files;
  // switch (option?.sortType) {
  //   case 'time':
  //     return files
  //       .sort((a, b) => a.stats.mtime.getTime() - b.stats.mtime.getTime())
  //       .map(file => file.path);
  //   case 'name':
  //   default:
  //     return files.map(file => file.path);
  // }
};
