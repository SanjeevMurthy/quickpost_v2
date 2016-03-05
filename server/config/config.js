var path=require('path');
var rootPath = path.normalize(__dirname+'/../../');

module.exports={
	development :{
		rootPath:rootPath,
		db:'mongodb://localhost/quickpost',
		port:process.env.PORT || 3030


	},
	production : {
		rootPath:rootPath,
		db:'mongodb://admin:admin@ds061395.mongolab.com:61395/quickpost',
		port:process.env.PORT || 80

	}
}