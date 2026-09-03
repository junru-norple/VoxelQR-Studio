const { app, BrowserWindow, Menu, session } = require('electron');
const path = require('node:path');

const ALLOWED_PROTOCOLS = new Set(['file:', 'data:', 'blob:', 'devtools:']);
const windows = new Set();

app.setName('VoxelQR Studio');
app.setAppUserModelId('app.voxelqr.studio');

function isAllowedRuntimeUrl(rawUrl) {
  try {
    return ALLOWED_PROTOCOLS.has(new URL(rawUrl).protocol);
  } catch {
    return false;
  }
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 900,
    minHeight: 640,
    show: false,
    backgroundColor: '#e6f1ed',
    autoHideMenuBar: true,
    title: 'VoxelQR Studio',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      spellcheck: false,
    },
  });
  windows.add(window);
  window.on('closed', () => windows.delete(window));

  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) event.preventDefault();
  });
  window.webContents.on('did-fail-load', (_event, code, description, url) => {
    console.error('WINDOW_LOAD_FAILED', { code, description, url });
  });
  window.webContents.on('render-process-gone', (_event, details) => {
    console.error('RENDER_PROCESS_GONE', details.reason, details.exitCode);
  });
  window.once('ready-to-show', () => window.show());
  const sourceRoot = path.join(__dirname, '..');
  const sourceParent = path.dirname(sourceRoot);
  const developmentWorkspace = path.basename(sourceParent).toLowerCase() === '_workspace'
    ? sourceParent
    : path.join(sourceRoot, '_workspace');
  const entryPoint = app.isPackaged
    ? path.join(__dirname, '..', 'build', 'desktop', 'index.html')
    : path.join(developmentWorkspace, 'build', 'v1.1.0-r6', 'desktop', 'index.html');
  window.loadFile(entryPoint).catch((error) => console.error('WINDOW_LOAD_REJECTED', error));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  session.defaultSession.setPermissionCheckHandler(() => false);
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => callback({ cancel: !isAllowedRuntimeUrl(details.url) }));
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}).catch((error) => console.error('APP_START_FAILED', error));

app.on('window-all-closed', () => app.quit());
