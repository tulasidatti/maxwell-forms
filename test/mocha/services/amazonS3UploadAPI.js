process.env.NODE_ENV = 'test';
var should = require('should');
var fs=require('fs');

var s3upload = require('../../../lib/services/amazonS3UploadAPI');


describe('S3uploader', function() {
	this.timeout(5000);
	
	it('should upload file to s3',  function (done) {	
		var file=[{}], writeStream;

		file.originalFilename = 'MasterForm1.pdf';
		file.path =  __dirname + '/' + 'MasterForm1.pdf';
		writeStream = fs.createWriteStream(file.path);
		writeStream.close();

		s3upload.fileUpload(file).then(function(result) {   
			result.should.have.property('ETag');
			should(!result.ETag).not.be.ok();				
			done()
		});	
	});

	
	it('should fail to upload file to s3',  function (done) {	
		var file=[{}], writeStream;

		file.originalFilename = 'MasterForm2.pdf';
		file.path =  __dirname + '/' + 'MasterForm2.pdf';
		writeStream = fs.createWriteStream(file.path);
		writeStream.close();		


		s3upload.fileUpload(file).then(function(result) { 			
			throw new Error('Should fail uploading pdf')
		}).catch(function(error) {			
			done()
		});
		
	});

	
});

