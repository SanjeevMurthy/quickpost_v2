var express=require('express'),
	stylus=require('stylus'),
	logger=require('morgan'),
	bodyParser=require('body-parser'),
	mongoose=require('mongoose');

var env = process.env.NODE_ENV= process.env.NODE_ENV || 'production';
var port=process.env.PORT || 3030;
var app=express();

function compile(str,path){
	return stylus(str).set('filename',path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
		{
			src : __dirname + '/public',
			compile:compile
		}
));

app.use(express.static(__dirname+'/public'));

if(env === 'development'){
	mongoose.connect('mongodb://localhost/quickpost');
}else{
	mongoose.connect('mongodb://admin:admin@ds061395.mongolab.com:61395/quickpost');
}

//mongoose.connect('mongodb://admin:admin@ds061395.mongolab.com:61395/quickpost');
var db=mongoose.connection;
db.on('error',console.error.bind(console,"connection error..!!"));
db.once('open',function(){
	console.log("QuickPost db opened..");
});
var messageSchema=mongoose.Schema({message:String});
var Message=mongoose.model('message',messageSchema);
var mongoMessage;

Message.findOne().exec(function(err,documnet){
	mongoMessage=documnet.message;
});

app.get('/partials/:partialPath',function(req,res){
	res.render('partials/'+req.params.partialPath);
});

app.get('*',function (req,res) {
	res.render('index',{
		mongoMessage:mongoMessage
	});
});

app.listen(port,function(){
	console.log("Listening on port "+port+"..!");
});