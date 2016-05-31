var should = require('should');
var _ = require('lodash');

require('../../../lib/services/logging');
var config = require('../../../config');

describe('Logging', function() {
	it('should create a winston logger', function() {
		var transports = _.keys(logger.transports);
		transports.length.should.equal(3);

		var types = ['console', 'error-file', 'info-file'];
		_.each(types, function(type) {
			transports.should.containEql(type);
		});
	});
});