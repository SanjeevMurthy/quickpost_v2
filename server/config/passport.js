var passport=require('passport'),
	mongoose=require('mongoose'),
	LocalStrategy=require('passport-local').Strategy,
	User=mongoose.model('user');


module.exports=function  (argument) {	

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
}