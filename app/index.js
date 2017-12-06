console.time('init')

const config = require('./config')
const path = require('path')
const electron = require('electron')
const app = electron.app
const ipc = electron.ipcMain
const tray = require('./tray')
const menu = require('./menu')
const window = require('./window')
const launch = require('./launch')
const clock = require('./clock')
const notice = require('./notice')
const updater = require('./updater')
const db = require('./db')
const isOnline = require('is-online');

app.dock.hide()

app.once('ready', () => {
	console.log('index init')
	
	window.init()
	menu.init()
	tray.init()
	launch.init()
	clock.init()
	updater.init()
	notice.init()
	db.init()

	// setTimeout(function() {}, config.DELAYED_INIT)
	
	ipc.on('exit', app.quit)
	ipc.on('ready', () => { console.timeEnd('init') })
	
	isOnline().then(online => {
		console.log('online', online)
	})
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', window.show)

app.on('before-quit', () => {
  app.quitting = true
})