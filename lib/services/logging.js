// Sets up logging transports using winston.js
// https://github.com/winstonjs/winston

process.env.TZ = 'UTC'
var winston = require('winston');
var fs = require('fs');
var _ = require('lodash');
var config = require('../../config');

var threshold = config.get('LOGGING_THRESHOLD');

if(!threshold)
	threshold = 'warn';

// Create logging directory and files if they don't already exist
// Check if base directory exists first
var log_directory = config.get('LOGGING_BASEDIR');
if(!fs.existsSync(log_directory)) {
	console.log('Creating a log directory');
	fs.mkdirSync(log_directory);
}

// Then check if each file exists and create it if it doesn't
_.each(config.get('LOGGING'), function(file) {
	if (!fs.existsSync(log_directory + file)) {
		console.log('Creating a log file for ' + log_directory + file);
		fs.writeFileSync(log_directory + file, '');
	}
});
// Sets up 3 transports
// Log important things to the console
// Log important things to a file
// Log info, warn, and error to a file (this may be overkill - we can always remove it)
var logger = new winston.Logger({
	transports: [
	new winston.transports.Console({
		level: threshold,
		timestamp: true
	}),
	new winston.transports.File({
		name: 'error-file',
		filename: log_directory + config.get('LOGGING')['ERROR'],
		level: 'error',
		timestamp: true
	}),
	new winston.transports.File({
		name: 'info-file',
		filename: log_directory + config.get('LOGGING')['DEFAULT'],
		level: 'info',
		timestamp: true
	}),
	]
});

global.logger = logger;