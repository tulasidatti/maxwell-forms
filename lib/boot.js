/**
 * Connect to the database
 * Configure express
 * Boot the server
 */

var _ = require('lodash');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Promise = require('promise');
var config = require('../config');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js')
var compiler = webpack(webpackConfig);
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
// Custom logging - adds `logger` to the global object
require('./services/logging')
// Statsd - adds `metrics` to the global object
require('./services/metrics')

// Define the express application
var app = express();

module.exports = function() {
	var promise = new Promise(function(resolve, reject) {
	// boot mySQL
	require('./services/database').connect()
		.then(function() {
		// Express configuration
		try {
			var PORT = (process.env.PORT) ? (process.env.PORT) : (8888);
			app.set('port', PORT);
			app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}))
			app.use(webpackHotMiddleware(compiler));
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({
			extended: false
			}));
			app.use(cookieParser());
			require('./routes/index').register(app);
			app.set('views', config.get('CWD') + '/views');
			app.use(express.static(config.get('CWD') + '/public'));          
		} catch (err) {
			logger.info('Failed to set app configuration: %s', err.message);
		}

		logger.info('Set application configuration');

		app.use(function(err, req, res, next) {
			logger.error(err.message);
			res.status(err.status || 500);
			if (process.env.NODE_ENV === 'production') {
				res.send('An error has occurred.');
			} else {
				res.send(err.stack);
			}
		});

		app.server = app.listen(PORT, function() {
			logger.log('Express server listening on port %d', PORT);
		});

		resolve();
		});
	})
	.catch(function(err) {
		logger.error('Something failed during mongo connect: %s', err.message);
		logger.info(err.stack);
		reject();
	});
}