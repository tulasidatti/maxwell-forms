process.env.NODE_ENV = 'test';
var should = require('should');
var _ = require('lodash');

require('../../../lib/services/logging');
var db = require('../../../lib/services/database');
var config = require('../../../config');

describe("FormTemplateToState Model Testing", function () {    
	var models, formTemplate; 

	beforeEach(function (done) {
		db.connect().then(function() {
			console.log("Connected to database successfully !!!");
			models = require('../../../lib/models');
			done(); 
		});
	});

	it("should create formTemplate and formTemplateToState successfully", function (done) {
		var formTemplateResult, formTemplateToStateResult1, formTemplateToStateResult2;	

		formTemplate = { 
			name: 'Test FormTemplate',
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
				return models.FormTemplateToState.create({stateId : 301})
			}).then(function (newformTemplateToStateResult1) {
				formTemplateToStateResult1 = newformTemplateToStateResult1;
				return models.FormTemplateToState.create({stateId : 302})
			}).then(function (newformTemplateToStateResult2) {
				formTemplateToStateResult2 = newformTemplateToStateResult2;
				return formTemplateResult.addFormTemplateToStates([formTemplateToStateResult1,formTemplateToStateResult2])
			}).then(function(result) {
				result.dataValues.should.have.property('name');
				result.dataValues.should.have.property('filePath');
				formTemplateToStateResult1.dataValues.should.have.property('id');
				formTemplateToStateResult2.dataValues.should.have.property('stateId');
				formTemplateToStateResult2.dataValues.stateId.should.be.a.Number();
				done();
			})
		})
	});
});