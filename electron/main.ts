import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
import path from 'node:path';
import Package from '../package.json';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
process.env.DIST = path.join(__dirname, '../out/renderer');
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

const INDEX_ROUTE = path.join(__dirname, '../renderer/index.html');
let win: BrowserWindow | null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line @typescript-eslint/no-require-imports
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
  Menu.setApplicationMenu(null);

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.png'),
    minWidth: 1080,
    minHeight: 720,
    show: true,
    title: Package.productName,
    autoHideMenuBar: true,
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

  win.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('file://')) {
      event.preventDefault();
      win?.loadFile(INDEX_ROUTE);
    }
  });

  win.webContents.on('did-fail-load', () => {
    win?.loadFile(INDEX_ROUTE);
  });

  if (!app.isPackaged) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:3200');
    win.webContents.openDevTools();
  } else {
    win.loadFile(INDEX_ROUTE);
  }
}

// remove reload to avoid breaking the view
app.on('browser-window-focus', () => {
  globalShortcut.register('CommandOrControl+R', () => {});
  globalShortcut.register('F5', () => {});
});

app.on('browser-window-blur', () => {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();
});
