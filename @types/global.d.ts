/**
 * レンダラープロセスで使用したいelectron api
 * 指定する型はvscodeでホバーしたときに出てくる表示をコピペかヒントにする
 * コンテキストが分離されている場合こうしなければならない。
 */
 export interface IElectronAPI {
    sendMsg: (channel: string, ...args: any[]) => void;
    recvMsg: (
      channel: string,
      Listener: (event: any, ...args: any[]) => void,
    ) => Electron.IpcRenderer;
    off: (channel: string) => void;
  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI;
    }
  }
  