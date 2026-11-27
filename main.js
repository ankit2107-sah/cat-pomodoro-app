const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

const WIDGET_WIDTH = 230;
const WIDGET_HEIGHT = 380;
let win;

function createWindow() {
  const { x, y, width, height } = screen.getPrimaryDisplay().workArea;
  win = new BrowserWindow({
    x: Math.max(x, x + width - WIDGET_WIDTH - 20),
    y: Math.max(y, y + height - WIDGET_HEIGHT - 20),
    width: WIDGET_WIDTH,
    height: WIDGET_HEIGHT,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    show: false,
    backgroundColor: '#00000000',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.once('ready-to-show', () => win.show());
  win.on('closed', () => { win = null; });
}

ipcMain.on('cat-window:set-mode', (event, mode) => {
  if (!win || event.sender !== win.webContents) return;
  if (mode === 'mini') {
    const { x, y, width, height } = screen.getPrimaryDisplay().workArea;
    win.setMinimumSize(WIDGET_WIDTH, WIDGET_HEIGHT);
    win.setResizable(false);
    win.setAlwaysOnTop(true);
    win.setSize(WIDGET_WIDTH, WIDGET_HEIGHT);
    win.setPosition(
      Math.max(x, x + width - WIDGET_WIDTH - 20),
      Math.max(y, y + height - WIDGET_HEIGHT - 20)
    );
  } else if (mode === 'full') {
    win.setAlwaysOnTop(false);
    win.setMinimumSize(400, 650);
    win.setResizable(true);
    win.setSize(500, 800);
    win.center();
  }
});

ipcMain.on('cat-window:close', event => {
  if (win && event.sender === win.webContents) win.close();
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
