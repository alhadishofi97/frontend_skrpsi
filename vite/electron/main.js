import { app, BrowserWindow, screen } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const mainWindow = new BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: false,
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Menyembunyikan menu bar secara permanen
    // mainWindow.setMenuBarVisibility(false);

    mainWindow.loadURL('http://localhost:3000/free'); // Alamat lokal Vite

    mainWindow.once('ready-to-show', () => {
        // mainWindow.setFullScreen(true);
    });

    // mainWindow.webContents.on('devtools-opened', () => {
    //     mainWindow.webContents.closeDevTools();
    // });

    // Buka DevTools jika diperlukan (opsional)
    // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

