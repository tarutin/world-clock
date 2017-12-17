import Vue from 'vue'
import App from './app.vue'
import config from '../config'
import electron from 'electron'
import $ from 'jquery'
const system = electron.remote.systemPreferences
const ipc = electron.ipcRenderer

q('title').innerHTML = config.APP_NAME
q('.app').className += system.isDarkMode() ? '' : 'light'

new Vue({
    el: 'app',
    render: h => h(App),
})

function q(s) {
    return document.querySelector(s)
}

ipc.send('app-height', $('.app').height())
// ipc.send('ready')
