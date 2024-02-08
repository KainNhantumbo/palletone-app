import { type MenuItemConstructorOptions } from 'electron';

export const menuTemplate: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'toggleDevTools' }
    ]
  },
  {
    label: 'Window',
    submenu: [{ role: 'minimize' }, { role: 'togglefullscreen' }, { role: 'close' }]
  },
  {
    label: 'Help',
    submenu: [{ role: 'about' }]
  }
];
