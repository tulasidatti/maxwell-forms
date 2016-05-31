var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var config = require('../../config');
var Promise = require('promise');
var DB = function() {
	this.connection = null;
}

DB.prototype.connect = function() {
	var self = this;
	return new Promise(function(resolve, reject) {
		logger.info('Connecting to ' + config.get('DB_NAME'));
		self.connection = new Sequelize(config.get('DB_NAME'), config.get('DB_USERNAME'), null, config.get('DB_OPTIONS'));
		self.connection.authenticate().then(function(errors) {
			if (errors) {
				reject(errors);
			} else {
				resolve();
			}
		});
	});
};

module.exports = {
	database: null,
	connect: function() {
		this.database = new DB();
		return this.database.connect();
	}
};