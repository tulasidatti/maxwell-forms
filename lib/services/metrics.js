/**
 * Send metrics to statds and events to DataDog API
 * @author emma@maxwellhealth.com
 */
var _ = require('lodash');
var os = require('os');
var config = require('../../config');
// Send metrics through UDP to local statsd
var StatsD = require('node-statsd').StatsD;
// Send events to the DataDog API
var dogapi = require('dogapi');
if (!global.logger) {
	require('./logging');
}

var DataDogStats = function(apiKey, appKey) {
	// EVENTS //
	if (!apiKey)
		logger.warn('DataDog API key missing from config');

	if (!appKey)
		logger.warn('DataDog Application key missing from config');

	eventsOptions = {
		api_key: apiKey,
		app_key: appKey
	};
	dogapi.initialize(eventsOptions);

	// METRICS //
	var options = {
		'host': os.hostname(),
		'cacheDns': true,
		'prefix': 'edi_core.',
		'global_tags': ['edi-core']
	};
	// Mock sending stats to server locally and when running tests
	if (['default', 'test'].indexOf(process.env.NODE_ENV) > -1) {
		logger.info('Local metrics - not sending to statds');
		options.mock = true;
	}

	this.statsd = new StatsD(options);

	this.statsd.socket.on('error', function(error) {
		return logger.error("statsd - error in socket: ", error);
	});
};

DataDogStats.prototype.increment = function(name, value, sampleRate, tags, callback) {
	// Name can be string or array of counters to increment, eg. ['counter1', 'counter2'] or 'counter1'
	this.runDataDogFunction('increment', name, value, sampleRate, tags, callback);
};

DataDogStats.prototype.decrement = function(name, value, sampleRate, tags, callback) {
	this.runDataDogFunction('decrement', name, value, sampleRate, tags, callback);
};

// Histogram: send data for histogram stat
DataDogStats.prototype.histogram = function(name, value, sampleRate, tags, callback) {
	this.runDataDogFunction('histogram', name, value, sampleRate, tags, callback);
};

// Timing: sends a timing command with the specified milliseconds
DataDogStats.prototype.timing = function(name, value, sampleRate, tags, callback) {
	this.runDataDogFunction('timing', name, value, sampleRate, tags, callback);
};

// Gauge: Gauge a stat by a specified amount
DataDogStats.prototype.gauge = function(name, value, sampleRate, tags, callback) {
	this.runDataDogFunction('gauge', name, value, sampleRate, tags, callback);
};

// Set: Counts unique occurrences of a stat (alias of unique)
DataDogStats.prototype.set = function(name, value, sampleRate, tags, callback) {
	this.runDataDogFunction('set', name, value, sampleRate, tags, callback);
};

DataDogStats.prototype.unique = function(name, value, sampleRate, tags, callback) {
	this.runDataDogFunction('unique', name, value, sampleRate, tags, callback);
};

DataDogStats.prototype.runDataDogFunction = function(methodName, name, value, sampleRate, tags, callback) {
	// Default values
	value = value || 1;
	sampleRate = sampleRate || 1;
	tags = tags || [];

	this.statsd[methodName](name, value, sampleRate, tags, callback);
};

// Events send to DataDog API, not to statsd
DataDogStats.prototype.event = function(title, text, options, callback) {
	// See docs for more info: brettlangdon.github.io/node-dogapi/#event
	var defaultOptions = {
		tags: ['maxwell-forms', 'env:' + process.env.NODE_ENV],
		alert_type: 'info',
		priority: 'low',
		aggregation_key: null,
		date_happened: null,
		host: os.hostname(),
		source_type_name: null
	};
	// Events need to have title and text
	if (!title || title === '' || !text || text === '') {
		return logger.error('DataDog event function requires title and text');
	}
	if ('tags' in options) {
		options.tags = _.union(options.tags, defaultOptions.tags);
	}
	// Override defaults with what's passed in
	var properties = _.extend(defaultOptions, options);
		dogapi.event.create(title, text, properties, callback);
	};

global.metrics = new DataDogStats(config.get('DATADOG_API_KEY'), config.get('DATADOG_APP_KEY'));
