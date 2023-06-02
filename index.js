const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { enableDrag } = require('electron-drag');

function createWindow () {
  const win = new BrowserWindow({
    width: 240,
    height: 120,
    frame: false, // Remove the default title bar
    transparent: true, // Make the window transparent
    alwaysOnTop: true, // Keep the window always on top
    enableDrag: true,
    webPreferences: {
        nodeIntegration : true,
      preload: path.join(__dirname, 'preload.js')
    } 
  })


  //win.loadFile('index.html')
  if(isDev){
    win.loadURL("https://localhost:3000");
  }
  else{
    win.loadFile("src/build/index.html");
  }

  win.setMenu(null);
  // Enable dragging for the window
  enableDrag(win);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})