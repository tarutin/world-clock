import Vue from 'vue'
import App from './app.vue'
import config from '../config'
import notice from '../notice'
import electron from 'electron'
import $ from 'jquery'
const system = electron.remote.systemPreferences
const ipc = electron.ipcRenderer

$('title').text(config.APP_NAME)
if (!system.isDarkMode()) $('.app').addClass('light')

new Vue({
    el: 'app',
    components: { App },
})

ipc.send('app-height', $('.app').height())

document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())
