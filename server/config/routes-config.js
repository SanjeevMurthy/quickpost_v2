var path=require('path'),
bodyParser=require('body-parser'),
mongoose=require('mongoose');


var rootPath = path.normalize(__dirname+'../../../');
var viewPath=rootPath+'server/views/';
var partialPath=rootPath+'public/app/partials/';

var auth=require('./auth');
var User=mongoose.model('user');
module.exports=function(app){

	app.get('/api/users',auth.requiresRole('admin'),function(req,res){
		User.find({}).exec(function(err,collection){
			res.send(collection);
		});
	});
	
	app.get('/partials/*',function(req,res){
		console.log("URI : "+'../../public/app/partials/'+req.params[0]);
		res.sendFile(partialPath+req.params[0]);
	});

	app.post('/login',auth.authenticate);

	app.post('/logout',function(req,res){
		req.logout();
		res.end();
	});

	app.get('/isloggedin',auth.isLoggedIn);

	app.get('/',function (req,res) {
		res.sendFile(viewPath + '/index.html');
	});


	

}