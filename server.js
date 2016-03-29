var express=require('express');


var env = process.env.NODE_ENV= process.env.NODE_ENV || 'development';

var app=express();

var config=require('./server/config/config')[env];//exposing an array of objects to choose based on environment

require('./server/config/express-config')(app,config);

require('./server/config/mongoose-config')(config);

require('./server/config/routes-config')(app);

require('./server/config/passport')();

app.listen(config.port,function(){
	console.log("Listening on port "+config.port+"..!");
});