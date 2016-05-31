process.env.NODE_ENV = 'test';
var should = require('should');
//var _ = require('lodash');

require('../../../lib/services/logging');
var db = require('../../../lib/services/database');
var config = require('../../../config');
 
describe("FormTemplateToProduct Model Testing", function () {    
	var models, formTemplate; 

	beforeEach(function (done) {
		db.connect().then(function() {
			console.log("Connected to database successfully !!!");
			models = require('../../../lib/models');
			done(); 
		});
	});

	it("should create formTemplate and formTemplateToProduct successfully", function (done) {
		var formTemplateResult, formTemplateToProductResult1,formTemplateToProductResult2;	

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
				return models.FormTemplateToProduct.create({productId : 201})
			}).then(function (newformTemplateToProductResult1) {
				formTemplateToProductResult1 = newformTemplateToProductResult1;
				return models.FormTemplateToProduct.create({productId : 202})
			}).then(function (newformTemplateToProductResult2) {
				formTemplateToProductResult2 = newformTemplateToProductResult2;
				return formTemplateResult.addFormTemplateToProducts([formTemplateToProductResult1,formTemplateToProductResult2])
			}).then(function(result) {
				result.dataValues.should.have.property('name');
				result.dataValues.should.have.property('filePath');
				formTemplateToProductResult1.dataValues.should.have.property('id');
				formTemplateToProductResult2.dataValues.should.have.property('productId');
				formTemplateToProductResult2.dataValues.productId.should.be.a.Number();
				done();
			})
		})
	});
});