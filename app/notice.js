module.exports = { init, send }

const electron = require('electron')
const config = require('./config')
const Notification = electron.Notification || electron.remote.Notification

function init() {
    console.log('notice init')

    // if(Notification.isSupported())
}

function send(text, callback) {
    let notice = new Notification({
        title: config.APP_NAME,
        body: text,
        silent: true,
        // icon: `${__dirname}/static/icon.png`,
    })

    notice.show()
    if (callback) notice.on('click', callback)
}
