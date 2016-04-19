var express =  require('express');
var bodyParser =  require('body-parser');
var morgan =  require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("database connection successful");
	}
});*/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});


app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/app/views/index.html');
});



http.listen(config.port,function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Listening to port 8888");
	}
});