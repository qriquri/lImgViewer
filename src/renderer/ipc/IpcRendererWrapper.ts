import { IElectronAPI } from 'global';
import { IFileInfo } from '../../common/IFileInfo';
import defaultConfig from '../../../defaultConfig.json';
import { setIsMaxAction } from '../slice/AppSlice';
import { setIsPlaying, setItem, setPlayingIndex } from '../slice/ViewerSlice';
import { store } from '../Store';
// eslint-disable-next-line valid-jsdoc
/**
 * Rendererプロセスのipc通信の受信を管理
 */
class IpcRendererWrapper {
  private LOG_TAG = 'IpcRendererReceiver:';
  private ipcSock: IElectronAPI;
  /**
   *
   */
  constructor() {
    this.ipcSock = window.electronAPI;
  }

  /**
   * start listen
   */
  listen(): void {
    // connectチャネルに送信
    this.ipcSock.sendMsg('connect');
    this.listenOpenDirRes();
    this.listenReOpenDirRes();
    this.listenMaximize();
    this.listenResized();
  }

  private listenOpenDirRes(): void {
    this.ipcSock.recvMsg(
      'open-dir-res',
      (
        _: Electron.IpcRendererEvent,
        result: { files: IFileInfo[]; selectedIndex: number },
      ) => {
        console.log('open-dir-res', result);
        if (result.files.length === 0) {
          return;
        }

        const selectedFile = result.files[result.selectedIndex].path;
        // TODO: ソートタイプを選択できるようにする
        const sortedFiles = result.files.sort(
          (a, b) => a.stats.birthtime.getTime() - b.stats.birthtime.getTime(),
        );
        let selectedIndex = 0;
        sortedFiles.map((file, index) => {
          if (file.path === selectedFile) {
            selectedIndex = index;
          }
        });
        
        store.dispatch(setPlayingIndex(0)); // undefined 対策
        store.dispatch(setItem(sortedFiles));
        store.dispatch(setPlayingIndex(selectedIndex));
        store.dispatch(setIsPlaying(false));
      },
    );
  }

  private listenReOpenDirRes(): void {
    this.ipcSock.recvMsg(
      're-open-folder-res',
      (
        _: Electron.IpcRendererEvent,
        result: { files: IFileInfo[]; selectedIndex: number },
      ) => {
        console.log('open-dir-res', result);
        if (result.files.length === 0) {
          return;
        }

        const selectedFile = result.files[result.selectedIndex].path;
        // TODO: ソートタイプを選択できるようにする
        const sortedFiles = result.files.sort(
          (a, b) => a.stats.birthtime.getTime() - b.stats.birthtime.getTime(),
        );
        let selectedIndex = 0;
        sortedFiles.map((file, index) => {
          if (file.path === selectedFile) {
            selectedIndex = index;
          }
        });
        
        store.dispatch(setPlayingIndex(0)); // undefined 対策
        store.dispatch(setItem(sortedFiles));
        store.dispatch(setPlayingIndex(selectedIndex));
        store.dispatch(setIsPlaying(false));
      },
    );
  }

  /** */
  private listenMaximize(): void {
    this.ipcSock.recvMsg('maximize', (_: Electron.IpcRendererEvent) => {
      console.log('maximize');
      store.dispatch(setIsMaxAction(true));
    });
  }
  /** */
  private listenResized(): void {
    this.ipcSock.recvMsg(
      'resized',
      (_: Electron.IpcRendererEvent, isMax: boolean) => {
        console.log('resized');
        store.dispatch(setIsMaxAction(isMax));
      },
    );
  }
}

const IpcRenderer = new IpcRendererWrapper();
Object.freeze(IpcRenderer);
export default IpcRenderer;
