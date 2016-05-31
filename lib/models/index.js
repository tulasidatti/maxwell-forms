var fs = require('fs');
var path = require('path');
db = require("../services/database")
var basename = path.basename(module.filename);

if (!db.database)
	throw new Error("No database connection- can't register models");

var registerModels = function(database) {
	logger.info('Registering models');
	var self = database;
		
	fs.readdirSync(__dirname)
		.filter(function(file) {
			return (file.indexOf('.') !== 0) 
				&& (file !== basename) 
				&& (file.slice(-3) === '.js') 
				&& file.indexOf('index') !== 0;
		})
		.forEach(function(file) {
			var model = self.connection['import'](path.join(__dirname, file));
			self[model.name] = model;
		});

	Object.keys(self).forEach(function(modelName) {
		if (self[modelName].associate) {
			self[modelName].associate(self);
		}
	});

	logger.info('Syncing models');
	return database.connection
			.sync()
			.catch(function(err) {
				logger.error(err);
			});
};

registerModels(db.database);

module.exports = db.database.connection.models;