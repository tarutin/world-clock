module.exports = { init, find }

const config = require('./config')
const mysql = require('mysql2')
// const notice = require('./notice')

var db
var connect = false

function init() {
    process.stdout.write('db init\n')

    db = mysql.createConnection(config.DB_CONNECT)

    db.connect(function(err) {
        if(err) {
            connect = false
            process.stdout.write('db not connected: ' + err.code + '\n')
        }
        else connect = true
    })

    db.on('error', function() { connect = false })

    setInterval(reconnect, 2000)
}

function find(q, callback) {
    if(!connect) reconnect()

    db.query(q, function(error, results, fields) {
        if(error) {
            process.stdout.write('db err ' + error.code + '\n')
            connect = false
            reconnect()
        }
        if(results) callback(results[0], fields)
    })
}

function disconnect() {
    connect = false
    db.end()
}

function reconnect() {
    if(!connect) {
        process.stdout.write('db lost connect\n')
        db = mysql.createConnection(config.DB_CONNECT)
        db.connect(function(err) {
            if(!err) {
                connect = true
                process.stdout.write('db reconnected\n')
            }
        })
    }
}
