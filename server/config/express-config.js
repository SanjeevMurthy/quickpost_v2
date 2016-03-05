var express=require('express'),
	stylus=require('stylus'),
	logger=require('morgan'),
	bodyParser=require('body-parser'),
	cookieparser=require('cookie-parser'),
	session=require('express-session'),
	passport=require('passport');

module.exports=function(app,config){
	function compile(str,path){
		return stylus(str).set('filename',path);
	}

	app.set('views', config.rootPath + '/server/views');
	app.set('view engine','jade');
	app.use(logger('dev'));
	app.use(cookieparser());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(session({secret:'quickpost bloggers',resave:false,saveUninitialized:false}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware(
			{
				src : config.rootPath + '/public',
				compile:compile
			}
	));

	app.use(express.static(config.rootPath+'/public'));

}

