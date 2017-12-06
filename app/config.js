const pkg = require('../package.json')
const config = {
	
	APP_NAME: pkg.productName,
	APP_VERSION: pkg.version,
	TRAY_ICON_MAC: `${__dirname}/static/tray.png`, 
	TRAY_ICON_MAC_DARKMODE: `${__dirname}/static/tray-darkmode.png`, 
	TRAY_ICON_WIN: `${__dirname}/static/tray-darkmode.png`,
	DOCK_ICON: `${__dirname}/static/icon.ico`,
	WIN_WIDTH: 370,
	DELAYED_INIT: 3000,
	UPDATER_CHECK_TIME: 1000 * 60 * 10,
	UPDATER_CHECK_VERSION: 'http://101101.ru/world/update.json',
	DB_CONNECT: 'mysql://world:rocks@101101.ru/world?charset=UTF8_GENERAL_CI',
}

module.exports = config