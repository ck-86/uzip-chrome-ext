var http = require('http');
var express = require('express');

var app = express();

var PORT = process.argv.slice(2);

app.use(express.static( __dirname ));

app.listen(PORT[0], function() {
	console.log('Server Listening On Port ' + PORT[0]);
});