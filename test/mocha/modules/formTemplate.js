process.env.NODE_ENV = 'test';
var should = require('should');
var _ = require('lodash');

require('../../../lib/services/logging');
var request = require('superagent');
var fs = require('fs');
describe("FormTemplate Save functionality and also CRUD Suite", function () {
 this.timeout(5000);
  it("should save form template successfully", function (done) {  
	
	var files = {
	  "file": [
		{
		  "originalFilename": 'MasterForm1.pdf',        
		  "path": __dirname + '/' + 'MasterForm1.pdf',
		}
	  ]
	}

	writeStream = fs.createWriteStream(files.file[0].path);
	writeStream.close(); 

	request.post('http://localhost:8888/forms')           
	  .field('name', 'Maxwell FormTemplate')    
	  .field('notes', 'Form Templte Notess')                        
	  .attach('file', files.file[0].path)
	  .then(function(res, err) {      
		res.status.should.eql(200);      
		done()
	});   
	
  });


   it("should fail to create FormTemplate ", function (done) {  
	
	 var files = {
	  "file": [
		 {
		   "originalFilename": 'MasterForm1.pdf',        
		   "path": __dirname + '/' + 'MasterForm1.pdf',
		 }
	   ]
	 }    

	 writeStream = fs.createWriteStream(files.file[0].path);
	 writeStream.close(); 

	 request.post('http://localhost:8888/forms')           
	   
	   .field('notes', 'Form Templte Notess')                        
	   .attach('file', files.file[0].path)      
	   .end(function(err, res) {  
			res.redirects[0].should.endWith('failure'); 
		 done()
	 });   
	
   });


  it("should get FormTemplate data", function (done) {

  request.get('http://localhost:8888/forms')             
	  .end(function(err, res) {              
		 res.status.should.eql(200); 
	 done();
   });
	
  });


 it("should fail to get FormTemplate data", function (done) {

	request.get('http://localhost:8888/Mforms')             
	  .end(function(err, res) {            
		  res.status.should.eql(404); 
	  done();
	 });
	
 });


  it("should update form template successfully", function (done) {  
	
		var files = {
		  "file": [
			{
			  "originalFilename": 'MasterForm1.pdf',        
			  "path": __dirname + '/' + 'MasterForm1.pdf',
			}
		  ]
		}

		writeStream = fs.createWriteStream(files.file[0].path);
		writeStream.close(); 

		request.post('http://localhost:8888/forms/1')           
		  .field('name', 'Who is Johngalt ?')    
		  .field('notes', 'Form Templte Notess')                            
		  .attach('file', files.file[0].path)
		  .end(function(err, res) {      
			res.status.should.eql(200);      
			done()
		});
   });

  it("should fail to update form template successfully", function (done) {  
	
		var files = {
		  "file": [
			{
			  "originalFilename": 'MasterForm1.pdf',        
			  "path": __dirname + '/' + 'MasterForm1.pdf',
			}
		  ]
		}

		writeStream = fs.createWriteStream(files.file[0].path);
		writeStream.close(); 

		request.post('http://localhost:8888/forms/1')
		  .field('notes', 'Form Templte Notess')                            
		  .attach('file', files.file[0].path)
		  .end(function(err, res) {      
			res.status.should.eql(500);      
			done()
		});
  });

   it("should delete Form template data", function (done) {    
	

	 request.del('http://localhost:8888/forms/2')             
		 .end(function(err, res) {
		 res.status.should.eql(200); 
		 done();
	 });
	
   });

   it("should fail to delete Form template data", function (done) {    
	

	 request.del('http://localhost:8888/Maxforms/2')             
		 .end(function(err, res) {
		 res.status.should.eql(404); 
		 done();
	 });
	
   });
});