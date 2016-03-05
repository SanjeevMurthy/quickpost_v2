var path=require('path'),
bodyParser=require('body-parser');


var rootPath = path.normalize(__dirname+'../../../');
var viewPath=rootPath+'server/views/';
var partialPath=rootPath+'public/app/partials/';

var auth=require('./auth');

module.exports=function(app){
	
	app.get('/partials/*',function(req,res){
		//res.render('partials/'+req.params.partialPath);
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
		//res.render('index',viewPath+'/index.html');
		res.sendFile(viewPath + '/index.html');
	});

}