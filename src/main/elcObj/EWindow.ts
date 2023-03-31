/* eslint-disable require-jsdoc */
import { app, BrowserWindow, session } from 'electron';
import { appIcon, isDev } from '../util/util';
import path from 'path';
import os from 'os';
// import installExtension, {
//   REDUX_DEVTOOLS,
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-installer';
// const LOG_TAG = 'EWindow';
// const reactDevToolsPath = path.join(
//   os.homedir(),
//   'AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.27.1_0',
// );
// const reduxDevToolsPath = path.join(
//   os.homedir(),
//   'AppData\\Local\\Google\\Chrome\\User DataDefault\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\3.0.17_0',
// );
export const defaultWindowOptions: Electron.BrowserWindowConstructorOptions = {
  show: false, // 表示の準備が整ってから表示するので初めは隠しておく
  frame: true, // フレームレスにするか?
  width: 800,
  height: 400,
  minWidth: 600,
  minHeight: 400,
  transparent: false, // ここがtrueになってるとリサイズ出来なくなるから注意
  icon: appIcon,
  webPreferences: {
    nodeIntegration: false,
    // サンドボックス化してレンダラープロセスの機能を大幅に制限する
    sandbox: true,
    /**
     * Preloadスクリプトは絶対パスで指定する
     */
    preload: '',
  },
};

export default class EWindow {
  public static createNewWindow = (
    rendererPath: string,
    options: Electron.BrowserWindowConstructorOptions | undefined,
  ): Electron.BrowserWindow => {
    const window = new BrowserWindow(options);
    window.loadURL(rendererPath); // forge の場合loadURLでおけ
    return window;
  };

  /**
   * ウィンドウの表示やデベロッパーツールの読み込み
   * @param {Electron.BrowserWindow} window
   * @param {boolean} showDevTool
   */
  public static showWin(
    window: Electron.BrowserWindow,
    showDevTool: boolean,
  ): void {
    // ウィンドウ表示
    window.show();
    window.focus();
    // 開発時にはデベロッパーツールを開く
    if (isDev() && showDevTool) {
      window.webContents.openDevTools({ mode: 'detach' });
      // app.whenReady().then(async () => {
      //   console.log('react', reactDevToolsPath);
      //   console.log('redux', reduxDevToolsPath);
      //   await session.defaultSession.loadExtension(reactDevToolsPath);
      //   await session.defaultSession.loadExtension(reduxDevToolsPath);
      // });
    }
    console.log('window show');
  }
}
