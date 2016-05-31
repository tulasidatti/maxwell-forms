/*
  This is Amazon S3FS service which uplaods file to s3
  @Author : Laxmi Tulasi<laxmi.vaddipati@valuelabs.com>
*/

var fs=require('fs');
var S3FS = require('s3fs');
var config = require('../../config');


var s3fsImpl = new S3FS(config.get('AWS_BUCKET'),{
	accessKeyId:config.get('AWS_ACCESSKEYID'),
	secretAccessKey:config.get('AWS_SECRETACCESSKEY')
});

var s3Client = function() {

} 

s3Client.prototype.fileUpload = function(file) {  
	var stream = fs.createReadStream(file.path);
	return s3fsImpl.writeFile(file.originalFilename, stream).then(function(data){ 
		fs.unlink(file.path, function(err){
			if(err)
			console.error(err);
		})
		return data;
	});
};

module.exports = {  
	fileUpload: function(file) {
		s3upload = new s3Client();
		return s3upload.fileUpload(file);
	}
};