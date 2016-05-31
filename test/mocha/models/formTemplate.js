process.env.NODE_ENV = 'test';
var should = require('should');
var _ = require('lodash');

require('../../../lib/services/logging');
var db = require('../../../lib/services/database');
var config = require('../../../config');

describe("FormTemplate Model Testing", function () {    
	var models, formTemplate;

	beforeEach(function (done) {
		db.connect().then(function() {
			console.log("Connected to database successfully !!!");
			models = require('../../../lib/models');
			done(); 
		});
	});

	it("should Insert data to Form template table successfully", function (done) {
		formTemplate = { 
			name: 'Maxwell FormTemplate',
			filePath: 'Public/sample.pdf',
			formType: "Product",	
			vendor: 1,	
			eTag: null,	        
			notes: "Form Templte Notes",
			dateCreated: Math.floor(Date.now() / 1000),
			dateModified: Math.floor(Date.now() / 1000),
			active: 1 
		};
		db.connect().then(function() {
			models.FormTemplate.create(formTemplate).then(function (result) {
				result.dataValues.should.have.property('name');
				result.dataValues.should.have.property('filePath');
				result.dataValues.dateCreated.should.be.a.Number();
				result.dataValues.dateModified.should.be.a.Number();
				should(!result.dataValues.name).not.be.ok();				
				should(!result.dataValues.filePath).not.be.ok();							
				done();
			}).fail(function() {
				done()
			}).done();
		});
	});



	it("should create form template created successfully", function (done) {
		var formTemplateResult, formTemplateToVendorResult, formTemplateToStateResult;	
		formTemplate = { 
			name: 'Maxwell FormTemplate',
			filePath: 'Public/sample.pdf',
			formType: "Product",	
			vendor: 1,	
			eTag: null,		        
			notes: "Form Templte Notes",
			dateCreated: Math.floor(Date.now() / 1000),
			dateModified: Math.floor(Date.now() / 1000),
			active: 1 
		};
		db.connect().then(function() {
			models.FormTemplate.create(formTemplate).then(function (newformTemplateResult) {
				formTemplateResult = newformTemplateResult;
				return models.FormTemplateToVendor.create({vendorId : 401})
			}).then(function (newformTemplateToVendorResult) {
				formTemplateToVendorResult = newformTemplateToVendorResult;
				formTemplateResult.addFormTemplateToVendors([formTemplateToVendorResult])
				return models.FormTemplateToState.create({stateId : 2})
			}).then(function (newfformTemplateToStateResult) {
				formTemplateToStateResult = newfformTemplateToStateResult;				
				formTemplateResult.addFormTemplateToStates([formTemplateToStateResult])
			}).then(function(result) {
				formTemplateResult.dataValues.should.have.property('name');
				should(formTemplateResult.dataValues.name.length).be.below(255)
				formTemplateResult.dataValues.should.have.property('filePath');
				formTemplateResult.dataValues.should.have.property('formType');
				formTemplateToVendorResult.dataValues.should.have.property('vendorId');				
				formTemplateToStateResult.dataValues.should.have.property('stateId');	
				formTemplateResult.dataValues.notes.length!=0 ?should(formTemplateResult.dataValues.notes.length).be.below(500):'allowed';					
				done();
			}).fail(function() {
				done()
			}).done();
		});
	});
});