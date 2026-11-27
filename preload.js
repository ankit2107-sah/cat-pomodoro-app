const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopWindow', {
  setMode(mode) {
    if (mode === 'mini' || mode === 'full') ipcRenderer.send('cat-window:set-mode', mode);
  },
  close() {
    ipcRenderer.send('cat-window:close');
  }
});
