'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain
} from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'


let win
let addTodoWin

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    installVueDevtools()
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {}
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('openAddTodoWin', createTodoWindow)
ipcMain.on('closeAddTodoWin', () => {
  addTodoWin.close()
  addTodoWin = null;
  win.webContents.send('refresh')
})

function createTodoWindow() {
  addTodoWin = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  })
  addTodoWin.setMenu(null)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    addTodoWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/#/add-todo')
    // if (!process.env.IS_TEST) addTodoWin.webContents.openDevTools()
  } else {
    createProtocol('app')
    addTodoWin.loadURL('app://./#/add-todo.html')
  }
  addTodoWin.on('closed', () => {
    addTodoWin = null
  })
}