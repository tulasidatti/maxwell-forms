var models = require('../models');
var express = require('express');
var router = express.Router();
var util        = require('util');
var app = express();
//cookieParser = require('cookie-parser');
var session = require('express-session');

var s3uploader = require("../services/amazonS3UploadAPI");
var multiparty = require('multiparty');

var PER_PAGE   = 10;
var csv = require('express-csv');

app.use('/', router);

var sess ="";

//router.use(cookieParser());
router.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }})); 


router.post('/forms', function(req, res) {
	var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {      
           
		if(files) {
			var file =  files.file[0];     
			var templateName = typeof fields.name == 'undefined' ? null : fields.name[0]  
			file.originalFilename = Math.round(Date.now() / 1000) + "_" + file.originalFilename;  
			s3uploader.fileUpload(file).then(function(filepath){       
	      
				models.FormTemplate.create({
				name: templateName,
				notes: fields.notes[0],
				filePath: file.originalFilename,
				formType: 'Product',
				eTag: filepath.ETag,
				dateCreated: Math.floor(new Date() / 1000),
				dateModified: Math.floor(new Date() / 1000),  
				active: 1
				}).then(function(createdFormTemplate) { 
				models.FormTemplateToVendor.create({vendorId: 2})
				.then(function(createdFormTemplateToVendor) { 
				return createdFormTemplate.addFormTemplateToVendor(createdFormTemplateToVendor);  
				});
				 models.FormTemplateToState.create({stateId: 1})
				.then(function(createdFormTemplateToState) { 
				 return  createdFormTemplate.addFormTemplateToState(createdFormTemplateToState);  
				}).then(function(result){
					res.redirect(302, '/#/addFormTemplate/success');			
				})
				}).catch(function(err){			      
					//res.status(500)
					res.redirect(302, '/#/addFormTemplate/failure');
					//res.send("Fail to create FormTemplate with error : " + err )  
				});  
			}).catch(function(err){					
				res.redirect(302, '/#/addFormTemplate/failure');				
			});  
			
		}    
    });  
});


router.post('/forms/:form_id', function(req, res) {

	var form = new multiparty.Form();
	form.parse(req, function(err, fields, files) {      
           
	if(files) {
		var file =  files.file[0];  
		console.log(fields.name)
		var templateName = typeof fields.name == 'undefined' ? null : fields.name[0]  
		file.originalFilename = Math.round(Date.now() / 1000) + "_" + file.originalFilename;  
		var filepath = s3uploader.fileUpload(file);        
	        
		models.FormTemplate.update({
			name: templateName,
			notes: fields.notes[0],
			filePath: file.originalFilename,
			formType: 'Product',
			dateCreated: Math.floor(new Date() / 1000),
			dateModified: Math.floor(new Date() / 1000),  
			active: 1
		}, 
		{where: {id: req.params.form_id}})
			.then(function(result){
			          res.redirect(302, '/#/addFormTemplate');
			}).catch(function(err){  
				console.log(err)      
				res.status(500)
				res.send("Fail to create form template with error : " + err )  
			});  
		}    
    });  
});

function getPaginatedItems(items, offset) {

  return items.slice(offset, offset + PER_PAGE);
}

router.get('/forms', function(req, res) {	
console.log(sess)
	if(sess.username) {console.log("if");
		res.redirect('/#/login');
	}else {console.log("lsee");
	var wherecond = {};
	var orcond =[];
	vendor = [];
	if(req.query.formName) {
		orcond.push({'name':{
		    $like: '%'+req.query.formName+'%'
		}})
		orcond.push({'id':{
		    $like: '%'+req.query.formName+'%'
		}})		
		wherecond = {
			$or: orcond
		}
	}
	if(req.query.vendor) {		
		req.query.vendor.map(function(item) {
    		vendor.push(item.id)
		});		
	}

	models.FormTemplate.findAll({  where : wherecond, 

   		include: [ { model: models.FormTemplateToVendor, required: true, where: {'vendorId': vendor}} ]
	}).then(function(forms) {

	/*  for (var i=0; i<forms.dataValues.length; i++){
console.log(forms[i]);
	  }*/
//var frms = [{"id":1,"name":"Who is Johngalt ?"},{"id":3,"name":"fhj"},{"id":4,"name":"huklh"}]
	//res.csv(forms);
//var frms = [{"id":1,"filePath":"1462451414_MasterForm1.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"Form Templte Notess","name":"Who is Johngalt ?","dateCreated":1462451413,"dateModified":1462451413,"active":true},{"id":3,"filePath":"1462356708_1461767012_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"ser","name":"fhj","dateCreated":1462356713,"dateModified":1462356713,"active":true},{"id":4,"filePath":"1462356875_1461757548_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"fgy","name":"huklh","dateCreated":1462356880,"dateModified":1462356880,"active":true},{"id":5,"filePath":"1462357178_1461767012_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"sdf","name":"drgyj","dateCreated":1462357183,"dateModified":1462357183,"active":true},{"id":6,"filePath":"1462357294_1461767012_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"jio[u","name":"tyk","dateCreated":1462357300,"dateModified":1462357300,"active":true},{"id":7,"filePath":"1462357502_1461767012_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"ghjl","name":"frjy","dateCreated":1462357509,"dateModified":1462357509,"active":true},{"id":8,"filePath":"1462357566_1461767012_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"cfgn","name":"dyj","dateCreated":1462357571,"dateModified":1462357571,"active":true},{"id":9,"filePath":"1462359006_1461757548_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"xdfh","name":"dfgj","dateCreated":1462359012,"dateModified":1462359012,"active":true},{"id":10,"filePath":"1462359120_1461767012_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"dh","name":"yt","dateCreated":1462359124,"dateModified":1462359124,"active":true},{"id":11,"filePath":"1462362967_1461767012_document.pdf","eTag":"\"74b81ed85e94bda0cd4dd70041f38cc3\"","formType":"Product","notes":"xcfb","name":"hj","dateCreated":1462362974,"dateModified":1462362974,"active":true}]
	//	res.csv(frms);
		//res.send(forms);

		 var items          = forms;
  var offset         = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  var nextOffset     = offset + PER_PAGE;
  var previousOffset = (offset - PER_PAGE < 1) ? 0 : offset - PER_PAGE;

  var meta = {
    limit       : PER_PAGE,
    next        : util.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
    offset      : req.query.offset,
    previous    : util.format('?limit=%s&offset=%s', PER_PAGE, previousOffset),
    total_count : items.length
  };

  var json = {
    meta     : meta,
    comments : getPaginatedItems(items, offset)
  };

  return res.json(json);
 
	});
}
});

router.get('/forms/:form_id', function(req, res) {
		models.FormTemplate.findOne({
		where: {id: req.params.form_id}
	}).then(function(form) {
		res.send(form);
	});
});

router.delete('/forms/:form_id', function(req, res) {
		models.FormTemplate.destroy({
		where: {id: req.params.form_id}
	}).then(function() {
		res.send([]);
	});
});

router.delete('/products/:productIds', function(req, res) {	
	var array = req.params.productIds.split(',');
	console.log(array);
		models.FormTemplate.destroy({
		where: {id: array}
	}).then(function(err) {
		 if (err) {
            res.end('error');
        }
        else {
            res.end('success');
        }
	});
});
router.post('/login', function(req, res) {	
	if(sess.username){
		console.log(sess.username)
	}
	else {
		console.log("lse")
	}
	models.User.find({  where: {username: req.body.username, password: req.body.password}
	}).then(function(users) {
		
		if (users) {
			sess = req.session;
			sess.username = users.username;
		sess.save();
           return res.json(users);
        }
        else {
           return res.json({status:"failure"});
        }
    });
});

module.exports = router;