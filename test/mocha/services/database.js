process.env.NODE_ENV = 'test';
var should = require('should');
var _ = require('lodash');

require('../../../lib/services/logging');
var db = require('../../../lib/services/database');
var config = require('../../../config');

/*
(node) warning: possible EventEmitter memory leak detected. 
11 exit listeners added. Use emitter.setMaxListeners() to increase limit.
TODO : Need to check with Emma if we can go with this workaround
*/
require('events').EventEmitter.defaultMaxListeners = Infinity;

describe('Database', function() {

	beforeEach(function (done) {
		db.connect().then(function() {
			console.log("Connected to database successfully !!!");
			models = require('../../../lib/models');
			done(); 
		});
	});

	it('should connect to a test database', function() {
		db.connect().then(function() {
			var db = db.database.connection.config.database;
			db.should.equal('database_test');
			var models = require('../../../lib/models');
		});
	});

	it('should write and read a form', function() {
		db.connect().then(function() {
			var models = require('../../../lib/models');
			models.FormTemplate.create({
				name: 'Test'
			}).fail(function(err) {
				throw new Error(err);
			});
		});
	});
});