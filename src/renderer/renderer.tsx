/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Start } from './components/Start';
import { store } from './Store';
import { Provider } from 'react-redux';
import './index.css';
import IpcRenderer from './ipc/IpcRendererWrapper';

console.log('👋 This message is being logged by "renderer.js", included via webpack');
IpcRenderer.listen();

const container = document.getElementById('contents');

ReactDom.render(
  // 変更 -->
  <Provider store={store}>
    <Start />
  </Provider>,
  // <-- 変更
  container,
);
