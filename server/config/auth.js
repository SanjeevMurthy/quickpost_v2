
var passport=require('passport');

exports.authenticate=function(req,res,next){
		console.log("request :"+req.user);

		var auth=passport.authenticate('local',function(err,user){
			if(err){return next(err);			}
			if(!user){
				console.log("User not found !!!");
				res.send({success:false});
			}
			req.logIn(user,function(err){
				if(err){
					return next(err);
				}else{
					res.send({success:true,user:user});
				}
			});
		});

		auth(req,res,next);
};


exports.isLoggedIn=function(req,res,next){
	var check=function(){
		console.log("Checking if user is logged in !!");
		if(req.user){
			console.log('User alive !!');
			res.send({loggedIn:true,user:req.user});
		}else{
			console.log("Cannot find any logged in user !!");
			res.send({loggedIn:false,user:undefined});
		}
	};

	check(req,res,next);
	
};