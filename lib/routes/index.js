var models = require('../models');
var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var basename = path.basename(module.filename);
var router = express.Router();

var Registry = function() {
	logger.info('Registering routes');
	fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && file.indexOf('index') !== 0;
	})
	.forEach(function(file) {
		var oneRouter = require(__dirname + '/' + file);
		_.extend(router, oneRouter);
	});
	return router;
};


module.exports = {
	register: function(app) {
		var router = new Registry();
		app.use('/', router);
		return router;
	}
};