module.exports = { toggle }

const path = require('path')
const electron = require('electron')
const app = electron.app || electron.remote.app
const config = require('./config')
const AutoLaunch = require('auto-launch')

var launch = null

function toggle() {
    if (!launch) {
        let appPath = process.platform === 'darwin' ? app.getPath('exe').replace(/\.app\/Content.*/, '.app') : undefined
        launch = new AutoLaunch({ name: config.APP_NAME, path: appPath, isHidden: true })
    }

    launch.isEnabled().then(enabled => {
        if (!enabled) {
            launch.enable()
        } else {
            launch.disable()
        }
    })
}
