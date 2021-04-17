const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

//Listen for app to be ready
app.on('ready', function(){
    //Create new Window
    mainWindow = new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

//Create menu template
const mainMenuTemplate = [
  {
    label: 'File', 
    submenu: [
      {
        label: 'Quit', 
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

//If MAC, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

//Add developer tools tab if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}