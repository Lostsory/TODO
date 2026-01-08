const { app, BrowserWindow, Menu, Tray, ipcMain, Notification } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;
const todoStore = path.join(app.getPath('userData'), 'todos.json');
const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 480,
    frame: false,  // 移除窗口边框，完全自定义
    transparent: false,
    backgroundColor: '#f9fafb',
    resizable: false,  // 禁止调整窗口大小
    alwaysOnTop: true,
    show: false,  // 初始隐藏窗口
    skipTaskbar: process.platform === 'darwin',  // macOS不在Dock中显示
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 开发环境加载Vite开发服务器，生产环境加载打包后的文件
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile('dist/index.html');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 窗口关闭时隐藏而不是退出
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // 窗口失去焦点时自动隐藏（点击空白区域）
  mainWindow.on('blur', () => {
    // 延迟一点隐藏，避免误触
    setTimeout(() => {
      if (mainWindow && !mainWindow.isFocused()) {
        mainWindow.hide();
      }
    }, 100);
  });
}

function createTray() {
  const fs = require('fs');
  const nativeImage = require('electron').nativeImage;
  const iconPath = path.join(__dirname, 'assets', 'icon.png');

  let trayIcon;
  if (fs.existsSync(iconPath)) {
    // 使用自定义图标
    const originalIcon = nativeImage.createFromPath(iconPath);
    // 调整图标尺寸为适合macOS菜单栏的大小
    // 使用 aspectRatio 保持比例，质量设为 best
    trayIcon = originalIcon.resize({
      width: 18,
      height: 18,
      quality: 'best'
    });
    // 设置为Template模式（自动应用圆角和颜色适配）
    trayIcon.setTemplateImage(true);
  } else {
    // 创建一个简单的16x16 Template图标
    const iconData = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAFklEQVQ4T2nk5eamwADZk3Y3xMFZxkAAE2dB3BrKxl5AAAAAElFTkSuQmCC',
      'base64'
    );
    trayIcon = nativeImage.createFromBuffer(iconData);
  }

  tray = new Tray(trayIcon);

  // 创建右键菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Mac Desktop Todo - 左键显示/隐藏，右键退出');

  // 定位窗口到托盘图标下方
  function positionWindow() {
    const trayBounds = tray.getBounds();
    const windowBounds = mainWindow.getBounds();

    // 计算窗口位置：居中于托盘图标，紧贴顶部
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
    const y = trayBounds.y + trayBounds.height;

    mainWindow.setPosition(x, y);
  }

  // 左键点击托盘图标切换窗口显示/隐藏
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      positionWindow();
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // 右键点击显示菜单（仅 macOS）
  if (process.platform === 'darwin') {
    tray.on('right-click', () => {
      tray.popUpContextMenu(contextMenu);
    });
  }
}

app.whenReady().then(() => {
  createWindow();
  createTray();

  // 隐藏Dock图标（仅macOS）
  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  // 只在非开发环境下设置开机自启动
  if (!isDev) {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true,  // 隐藏启动，不显示窗口
      path: process.execPath,
      args: []
    });
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC 通信处理
ipcMain.handle('save-todos', async (event, todos) => {
  const fs = require('fs').promises;
  try {
    await fs.writeFile(todoStore, JSON.stringify(todos, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Failed to save todos:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-todos', async () => {
  const fs = require('fs').promises;
  try {
    const data = await fs.readFile(todoStore, 'utf-8');
    return { success: true, todos: JSON.parse(data) };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { success: true, todos: [] };
    }
    console.error('Failed to load todos:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('show-notification', async (event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({ title, body }).show();
    return { success: true };
  }
  return { success: false, error: 'Notifications not supported' };
});

// 退出应用
ipcMain.handle('quit-app', async () => {
  app.isQuitting = true;
  app.quit();
  return { success: true };
});

// 获取开机启动状态
ipcMain.handle('get-login-item-settings', async () => {
  const settings = app.getLoginItemSettings();
  return {
    success: true,
    openAtLogin: settings.openAtLogin
  };
});

// 设置开机启动
ipcMain.handle('set-login-item', async (event, enabled) => {
  app.setLoginItemSettings({
    openAtLogin: enabled,
    openAsHidden: true,
    path: process.execPath,
    args: []
  });
  return { success: true, enabled };
});
