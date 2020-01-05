'use strict'

import { app, BrowserWindow } from 'electron'

import finder from 'findit'
import path from 'path'
import uuid from 'uuid/v4'

import store from '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webviewTag: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // TODO: Get this value from settings.
  // TODO: Store data in database, pull additional values from filesystem?
  const rootDir = '/Users/kit/Dropbox/Apps/Ex Libris/RPGs/Buried without Ceremony'
  scanDropbox(rootDir)
}

function scanDropbox (libraryRoot) {
  // const FILE_TYPES = new Set(['.pdf', '.txt'])
  store.dispatch('setLoading')
  store.dispatch('unpreviewBook')
  store.dispatch('clearBooks')

  const find = finder(libraryRoot)
  const books = {}

  find.on('directory', (dir, stat, stop) => {
    const base = path.basename(dir)
    if (base.startsWith('.')) {
      stop()
    }
  })

  find.on('file', (file) => {
    if (file.endsWith('.pdf')) {
      const newBook = {
        id: uuid(),
        title: path.basename(file),
        authors: [],
        publisher: '',
        series: '',
        edition: '',
        year: '',
        tags: [],
        fullPath: file
      }
      books[newBook.id] = newBook
    }
  })

  find.on('end', () => {
    store.dispatch('setBooks', books)
    store.dispatch('unsetLoading')
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
