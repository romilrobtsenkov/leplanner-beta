var util = require('util');
var moment = require('moment');
var chalk = require('chalk');
var config = require('./config/config.js');
var onFinished = require('on-finished');

var mail;

module.exports = function (config) {


	var levels = {
		EMERG: 0,
		ALERT: 1,
		CRIT: 2,
		ERR: 3,
		WARNING: 4,
		NOTICE: 5,
		INFO: 6,
		DEBUG: 7,
	};

	var colormap = {
		ERR: 'red',
		WRN:'yellow',
		NOT: 'cyan',
		INF: 'white',
		DEB: 'gray'
	};

	function output(level, str) {
		console.log('[' + chalk.dim(getTimestamp()) + ' (' + chalk[colormap[level]](level) + ')] ' + str);
	}

	const LEVEL_ERROR = 'ERR';
	const LEVEL_WARNING = 'WRN';
	const LEVEL_NOTICE = 'NOT';
	const LEVEL_INFO = 'INF';
	const LEVEL_DEBUG = 'DEB';

	function noop() {}
	mail = noop;

	function logFn(levelString) {
		if (config.level < levels[levelString]) return noop;
		return function () {
			output(levelString, util.format.apply(this, arguments));
		};
	}

	function getTimestamp(date) {
		if (!date) {
			date = new Date();
		}
		return moment(date).format('YYYY-MM-DD HH:mm:ss');
	}

	return {
		middleWare: function () {
			function statusStyle(status) {
				if (status < 300) return chalk.green(status);
				if (status < 400) return chalk.yellow(status);
				return chalk.red(status);
			}
			return function (req, res, next) {
				var start = new Date();
				onFinished(res, function (err) {
					this.info(req.method, req.originalUrl.replace('/api',''), req.user && req.user._id || 'guest' , statusStyle(res.statusCode), (new Date() - start) + 'ms');
				}.bind(this));
				next();
			}.bind(this);
		},

		level: config.level,
		debug: logFn(LEVEL_DEBUG),
		info: logFn(LEVEL_INFO),
		notice: logFn(LEVEL_NOTICE),
		warning: logFn(LEVEL_WARNING),
		error: function () {
			mail({ subject: config.appName + ' error', message: util.format.apply(this, arguments)});
			if (this.level >= levels[LEVEL_ERROR]) {
				output(LEVEL_ERROR, util.format.apply(this, arguments));
			}
		}
	};
}(config.log);
