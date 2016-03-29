var mongoose=require('mongoose');
var crypto=require('crypto');



module.exports=function (config) {
	mongoose.connect(config.db);
	var db=mongoose.connection;
	db.on('error',console.error.bind(console,"connection error..!!"));
	db.once('open',function(){
		console.log("QuickPost db opened..");
	});
}

var userSchema=mongoose.Schema({
	firstname:String,
	lastname:String,
	username:String,
	salt:String,
	hashed_pwd:String,
	roles:[String]
});

userSchema.methods={
	authenticate:function(passwordToMatch){
		return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	}
}

var User=mongoose.model('user',userSchema);

User.find({}).exec(function(err,collection){
	if(collection.length === 0){
		var salt,hash;
		salt=createSalt();
		hash=hashPwd(salt,'sanju');
		User.create({firstname:'Sanjeev',lastname:'Murthy',username:'sanju',salt:salt,hashed_pwd:hash,roles:['admin']});
		salt=createSalt();
		hash=hashPwd(salt,'pooja');
		User.create({firstname:'Pooja',lastname:'Gurubasappa',username:'pooja',salt:salt,hashed_pwd:hash,roles:[]});
	}
});


function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd){
	var hashMessageAuthenticationCode=crypto.createHmac('sha1',salt);
	/*hashMessageAuthenticationCode.setEncoding('hex');
	hashMessageAuthenticationCode.write(pwd);
	hashMessageAuthenticationCode.end();
	return hashMessageAuthenticationCode.read();*/
	return hashMessageAuthenticationCode.update(pwd).digest('hex'); 
}