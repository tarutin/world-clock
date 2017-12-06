const electron = require('electron')
const remote = electron.remote
const app = remote.app
const ipc = electron.ipcRenderer
const request = remote.require('request')
const config = remote.require('./config')
const updater = remote.require('./updater')
const db = remote.require('./db')


$(function()
{
    updater.auto({ win:electron.remote.getCurrentWindow() })
    updateTime()
    runClock()

    ipc.on('app-height-update', () => {
        ipc.send('app-height', $('.app').height())
    })

    ipc.on('clock-added', (e, clock) => {
        let index = $('.clock button').length
        $('.clock').append(`
            <button data-index='${index}'>
                ${clock.full}
                <time data-offset='${clock.offset}'></time>
                <span class='delete'><i class='fa fa-fw fa-times-circle fa-fw'></i></span>
            </button>
        `)
        updateTime()
        ipc.send('app-height', $('.app').height())
    })
    
    $('.app').on('click', '.ipc-exit', function() {
        ipc.send('exit')
    })
    
    $('.app').on('click', '.ipc-update', function() {
        ipc.send('check-update')
    })
    
    $('.app').on('click', '.ipc-startup', function() {
        $('.ipc-startup').toggleClass('active')
        ipc.send('startup')
    })
    
    $('.app').on('keyup', '.search input', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which)
        var q = $('.search input').val().trim()
        var label = $('.search label').text()
        
        if(keycode == 13) {
            if(label != '') ipc.send('clock-add', label)
            else if(q != '') ipc.send('clock-add', q)
            
            $('.search label').text('')
            $('.search input').val('')
        }
        else {
            if(q == '') {
                $('.search label').text('')
            }
            else {
                db.find(`SELECT name, UPPER(country) code FROM cities WHERE city LIKE '${q}%' ORDER BY popularity DESC LIMIT 1`, (city) => {
                    $('.search label').text(!city ? 'Not found' : city.name + ', ' + city.code)
                })
            }
        }
    })
    
    $('.app').on('click', '.clock button', function() {
        $(this).toggleClass('active')
        ipc.send('clock-toggle', $(this).data('index'))
    })
    
    $('.app').on('click', '.clock button .delete', function(e) {
        let button = $(this).closest('button')
        ipc.send('clock-remove', button.data('index'))
        button.remove()
        return false
    })
    
    ipc.send('app-height', $('.app').height())
    ipc.send('ready')
})


function updateTime() {
    let utc = Math.floor(new Date().getTime())
    $('.clock').find('button').each(function() {
        let time = $(this).find('time')
        let utc_offset = utc + (time.data('offset') * 3600000)
        time.text(formatTime(utc_offset))
    })
}

function runClock() {
    var now = new Date()
    var timeToNextTick = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()
    setTimeout(function() {
        updateTime()
        runClock()
    }, timeToNextTick)
}

function formatTime(ts) {
    var date = new Date(ts)
    var hours = date.getUTCHours()
    var minutes = '0' + date.getUTCMinutes()
    var seconds = '0' + date.getUTCSeconds()

    return hours + ':' + minutes.substr(-2)// + ':' + seconds.substr(-2)
}

document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())