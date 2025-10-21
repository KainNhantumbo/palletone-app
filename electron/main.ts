import { app, BrowserWindow, Menu } from 'electron';
import path from 'node:path';
import { menuTemplate } from './menu';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
process.env.DIST = path.join(__dirname, '../out');
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line no-require-imports
if (require('electron-squirrel-startup')) {
  app.quit();
}

// ensure this is the main and single app instance
// otherwise terminate the process immediately
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.png'),
    minHeight: 410,
    minWidth: 420,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      sandbox: true,
      contextIsolation: true
    }
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (!app.isPackaged) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:3200');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.DIST, '../out/renderer/index.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  }
});

app.whenReady().then(() => {
  createWindow();
});
