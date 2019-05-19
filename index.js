const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// process.env.NODE_ENV = 'production';

// Graph Calculator window url
const calcURL = url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, 'public', 'calc.html'),
    slashes: true,
});

// Equation runner window url
const eqURL = url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, 'public', 'equation.html'),
    slashes: true,
});

// Setting up platform
const platform = process.platform === 'darwin' ? 1 : 0;
const hotKey = platform ? 'Cmd+' : 'Ctrl+';

// Menu template
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: hotKey + 'Q',
                click(i, w) { w.close() }
            }
        ],
    },
    {
        label: 'Equation',
        submenu: [
            {
                label: 'Run',
                accelerator: hotKey + 'A',
                click() {
                    if (!count) addEquationWindow();
                }
            }
        ]
    }
];

if (platform) menuTemplate.unshift({label: ''});

if (process.env.NODE_ENV !== "production") {
    menuTemplate.push({
        label: "Developer",
        submenu: [
            {
                label: "Toggle Dev Tools",
                accelerator: hotKey + "Shift+C",
                click(i, w) { w.toggleDevTools(); }
            },
            {
                role: "reload"
            }
        ]
    });
}

const menu = Menu.buildFromTemplate(menuTemplate);

let calcWindow; // window for graph calculator
let equationWindow; // window for equation
let count = 0; // count for equation window

function addEquationWindow() {
    count = 1;

    equationWindow = new BrowserWindow({
        title: 'Equation',
        width: 280,
        height: 110,
        resizable: false,
        fullscreen: false,
    });

    equationWindow.loadURL(eqURL);

    equationWindow.on('close', () => {
        count = 0;
        equationWindow = null;
    });
}

app.on('ready', () => {

    calcWindow = new BrowserWindow({
        title: 'Graph Calculator',
        width: 500,
        height: 500,
        resizable: false,
        fullscreen: false,
        frame: false,
    });

    calcWindow.loadURL(calcURL);

    calcWindow.on('close', app.quit);

    Menu.setApplicationMenu(menu);

});

// Handling equation from equationWindow
ipcMain.on('equation:add', (e, equation) => {
    calcWindow.webContents.send('equation', equation);
    equationWindow.close();
});
