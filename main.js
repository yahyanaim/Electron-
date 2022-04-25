const electron = require('electron')
const {app, BrowserWindow, Menu} = electron
const path = require('path')
const url = require('url')

// Template for the Menu
menuTemplate = [
  {
    label: 'Application',
    submenu: [
      {
        label: 'About',
        click: () => {
          openAboutWindow()
        }
      }
    ]
  }
]

//  to not destroy our app
let mainWindow

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720
  })

  // Load the index.html file
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Set up the menu
  var menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)
//Emite lorsque la fenêtre est fermée. Après avoir reçu cet événement, vous devez supprimer la référence à la fenêtre et ne plus l'utiliser.
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Opens the about window
function openAboutWindow() {

  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 400,
    height: 200
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes: true
  }))
  // we settung to null to will remove from the bar in about menu (mabghinahch the ban)
  aboutWindow.setMenu(null)
  //listener funtion 
  aboutWindow.once('ready-to-show', () => {
    // when is ready to show it will pop up 
    aboutWindow.show()
  })
}

// Create the window then the app is ready
app.on('ready', () => {
  createWindow()
  // Emitted when the system changes to AC power.
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  // Emitted when system changes to battery power.
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Reopen the app on macOS
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
