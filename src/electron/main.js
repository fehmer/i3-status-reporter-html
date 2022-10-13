"use strict";
const getWindowPosition = require('./displayHelper.js');
const { execFile } = require( 'child_process');
const { app, BrowserWindow, ipcMain } = require( 'electron');
const electron = require( 'electron');
const path = require('path');

const args = JSON.parse(process.argv[3]);
args.window = args.window || {
    height: 2000,
    width: 800
};
const browser = args.browser || 'google-chrome';

let autoClose;
let mainWindow;
let window;
let autoCloseTimeout;


app.setName('i3-status-reporter-test');

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', () => {
    //load a url in the default browser
    ipcMain.on('load-url', (event, url) => {
        execFile(browser, [url]);
        event.returnValue = 'ok';
    });

    ipcMain.on('close-message', (event) => {
        mainWindow.close();
    });

    ipcMain.on('active-message', (event, enabled) => {
        enableAutoClose(!enabled);
        return true;
    });

    ipcMain.on('resize-message', (event, dim) => {
        const display = electron.screen.getDisplayNearestPoint(window);
        const maxHeight = display.size.height - window.barHeight;

        window.height = dim.height < maxHeight ? dim.height : maxHeight;
        window = getWindowPosition(window, display);
        mainWindow.setBounds(window)
        return true;
    });

    const primaryDisplay = electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint());

    window = {
        height: args.window.height,
        width: args.window.width,
        x: args.click && args.click.x || primaryDisplay.workArea.x + primaryDisplay.workArea.width - 1,
        y: args.click && args.click.y || args.top ? 0 : primaryDisplay.workArea.y + primaryDisplay.workArea.height - 1,
        top: args.top,
        barHeight: args.barHeight || 30,
        margin: args.margin || 0
    };

    const display = electron.screen.getDisplayNearestPoint(window);
    window = getWindowPosition(window, display);

    window = Object.assign(window,
        {
            alwaysOnTop: args.alwaysOnTop || true,
            frame: false,
            show: false,
            center: false,
            webPreferences: {
                devTools: true,
                preload: path.join(__dirname, 'preload.js')
            }
        });

    autoCloseTimeout = args.timeout * 1000;

    mainWindow = new BrowserWindow(window);
    mainWindow.setMenu(null);
    mainWindow.loadURL('file://' + process.argv[2]);

    mainWindow.once('ready-to-show', () => {
        mainWindow.showInactive();

        //set autoClose if args.timeput is set
        enableAutoClose(true);

        //open dev tools
        if (args.debug) mainWindow.webContents.openDevTools();
    });
});

function enableAutoClose(enabled) {
    if(enabled){
        if (autoCloseTimeout) {
            autoClose = setTimeout(() => {
                mainWindow.close();
            }, autoCloseTimeout);
        }
    } else {
        clearTimeout(autoClose);
    }
}
