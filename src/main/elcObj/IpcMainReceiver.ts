import { BrowserWindow, ipcMain } from 'electron';
import { IGetFilesOption } from '../../common/IGetFilesOption';
import Emitter from '../../services/emitter';
import { getFiles } from '../file/file';
const LOG_TAG = 'IpcMain';
/**
 * メインプロセスのipc通信の受信とリプライを管理
 */
class IpcMainWrapper {
  private ipcSock: Electron.IpcMain;
  /**
   *
   */
  constructor() {
    this.ipcSock = ipcMain;
  }

  /**
   * listen ipc
   */
  public listen(): void {
    this.listenConnect();
    this.listenOpenDirReq();
    this.listenReOpenDirReq();
    this.listenWinReq();
    this.listenCloseAppReq();
  }

  /**
   * windowがロードされたらやって来る通信を待つ
   */
  private listenConnect(): void {
    this.ipcSock.on('connect', (event: Electron.IpcMainEvent) => {
      console.log('connect-renderer');
    });
  }

  private listenOpenDirReq(): void{
    this.ipcSock.on('open-dir-req', (event: Electron.IpcMainEvent) => {
      console.log('open-dir-req');
      event.reply('open-dir-res', getFiles())
    })
  }

  private listenReOpenDirReq(): void{
    this.ipcSock.on('re-open-folder-req', (event: Electron.IpcMainEvent, selectedFile: string) => {
      console.log('re-open-folder-req');
      event.reply('re-open-folder-res', getFiles(selectedFile))
    })
  }

  /**
   * ウィンドウ操作リクエスト
   */
  private listenWinReq(): void {
    // <今フォーカスしているウィンドウを最大化>
    this.ipcSock.on('max-win-req', (event: Electron.IpcMainEvent) => {
      const window = BrowserWindow.getFocusedWindow();
      window?.maximize();
      console.log(LOG_TAG, 'maximize window');
    });
    // </今フォーカスしているウィンドウを最大化>
    // <今フォーカスしているウィンドウを最大化解除>
    this.ipcSock.on('restore-win-req', (event: Electron.IpcMainEvent) => {
      // 今フォーカスしているウィンドウを最小化
      const window = BrowserWindow.getFocusedWindow();
      window?.restore();
      console.log(LOG_TAG, 'restore window');
    });
    // </今フォーカスしているウィンドウを最大化解除>
    // <今フォーカスしているウィンドウを最小化>
    this.ipcSock.on('minimize-win-req', (event: Electron.IpcMainEvent) => {
      const window = BrowserWindow.getFocusedWindow();
      window?.minimize();
      console.log(LOG_TAG, 'minimize window');
    });
    // </今フォーカスしているウィンドウを最小化>
  }

  /**
   * アプリケーション終了リクエスト
   */
  private listenCloseAppReq(): void {
    this.ipcSock.on('close-app-req', (event: Electron.IpcMainEvent) => {
      // <ウィンドウが1つなら終了、複数ならそのウィンドウを閉じる>
      // if (BrowserWindow.getAllWindows().length === 1) {
      //   console.log(LOG_TAG, 'app quit');
      //   app.quit();
      // } else {
      // 今フォーカスしているウィンドウを閉じる
      const window = BrowserWindow.getFocusedWindow();
      window?.destroy();
      console.log(LOG_TAG, 'close window');
      // }
      // <ウィンドウが1つなら終了、複数ならそのウィンドウを閉じる>
    });
  }
}

const IpcMain = new IpcMainWrapper();
Object.freeze(IpcMain);
export default IpcMain;
