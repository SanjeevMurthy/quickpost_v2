var express=require('express'),
	mongoose=require('mongoose');
var passport=require('passport'),
	LocalStrategy=require('passport-local').Strategy;


var env = process.env.NODE_ENV= process.env.NODE_ENV || 'development';

var app=express();

var config=require('./server/config/config')[env];//exposing an array of objects to choose based on environment

require('./server/config/express-config')(app,config);

require('./server/config/mongoose-config')(config);

require('./server/config/routes-config')(app);

var User=mongoose.model('user');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
	function(username,password,done){
		console.log("Calling findOne for user : "+username);
		User.findOne({username:username}).exec(function(err,user){
			if(user && user.authenticate(password)){
				return done(null,user);
			}else{
				return done(null,false);
			}
		})
	}
));

app.use(function(req,res,next){
	console.log("\n\n User Object : "+req.user);
});

passport.serializeUser(function(user,done){
	if(user){
		done(null,user._id);
	}
});

passport.deserializeUser(function(id,done){
	User.findOne({_id:id}).exec(function(err,user){
		if(user){
			return done(null,user);
		}else{
			return done(null,false);
		}
	});
});




app.listen(config.port,function(){
	console.log("Listening on port "+config.port+"..!");
});