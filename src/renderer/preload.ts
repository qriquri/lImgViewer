// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
console.log('preload render');
/**
 * コンテキストが分離されている場合このようにする
 * 面倒くさいがこのようにすると、自分が想定していない送信が発生しなくなる
 */
 contextBridge.exposeInMainWorld('electronAPI', {
    sendMsg: (channel: string, ...args: any[]) =>
      ipcRenderer.send(channel, ...args),
    recvMsg: (
      channel: string,
      Listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
    ) => ipcRenderer.on(channel, Listener),
    off: (channel: string) => ipcRenderer.removeAllListeners(channel),
  });