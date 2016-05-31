process.env.NODE_ENV = 'test';
var should = require('should');
//var _ = require('lodash');

require('../../../lib/services/logging');
var db = require('../../../lib/services/database');
var config = require('../../../config');

describe("FormTemplateToVendor Model Testing", function () {    
	var models, formTemplate; 

	beforeEach(function (done) {
		db.connect().then(function() {
			console.log("Connected to database successfully !!!");
			models = require('../../../lib/models');
			done(); 
		});
	});

	it("should create formTemplate and formTemplateToVendor successfully", function (done) {
		var formTemplateResult, formTemplateToVendorResult1, formTemplateToVendorResult2;	

		formTemplate = { 
			name: 'Test FormTemplate',
			filePath: 'Public/sample.pdf',
			formType: "Product",
			vendor: 1,
			eTag: null,				        
			notes: "Form Template Notes",
			dateCreated: Math.floor(Date.now() / 1000),
			dateModified: Math.floor(Date.now() / 1000),
			active: 1 
		};

		db.connect().then(function() {
			models.FormTemplate.create(formTemplate).then(function (newformTemplateResult) {
				formTemplateResult = newformTemplateResult;
				return models.FormTemplateToVendor.create({vendorId : 401})
			}).then(function (newformTemplateToVendorResult1) {
				formTemplateToVendorResult1 = newformTemplateToVendorResult1;
				return models.FormTemplateToVendor.create({vendorId : 402})
			}).then(function (newformTemplateToVendorResult2) {
				formTemplateToVendorResult2 = newformTemplateToVendorResult2;
				return formTemplateResult.addFormTemplateToVendors([formTemplateToVendorResult1,formTemplateToVendorResult2])
			}).then(function(result) {
				result.dataValues.should.have.property('name');
				result.dataValues.should.have.property('filePath');
				formTemplateToVendorResult1.dataValues.should.have.property('id');
				formTemplateToVendorResult2.dataValues.should.have.property('vendorId');
				formTemplateToVendorResult2.dataValues.vendorId.should.be.a.Number();
				done();
			})
		})
	});
});