import { App, BrowserWindow } from 'electron';
import * as path from 'path';
import { dev, loadURL, nodeIntegration } from './config';

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

export const createWindow = async (app: App) => {
    if (dev) {
        await installExtensions();
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    }

    // const getSourceDirectory = () => dev
    // ? path.join(process.cwd(), 'dist')
    // : path.join(process.resourcesPath, 'app');

    // const preload = path.resolve(getSourceDirectory(), 'preload.js');
    // const preload = path.join(app.getAppPath(), 'preload.js')
    const preload = path.join(__dirname, 'preload.js')

    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            preload,
            nodeIntegration
        }
    });

    win.loadURL(loadURL);

    if (dev) {
        win.webContents.once('dom-ready', () => {
            win.webContents.openDevTools();
        });
    }

    return win;
};
