/**

Simple Node JS file data logger 
Saulo Matte Madalozzo saulo.zz@gmail.com

write file:
http://localhost:8081/?origin=test&msg=message

read file:
http://localhost:8080/?origin=test

**/

var fs = require('fs');
var http = require('http');
var url = require('url');

function writeFile(origin, msg){
	msg = getDate() + " - " +  msg;
	console.log(origin + ": " + msg);
	fs.appendFile(origin,  msg + "\r\n", function(err) {
	    if(err) {
	        return console.log(err);
	    }
	});
}

function readFile(origin){
	var result;
	try{
		result = fs.readFileSync(origin, "utf-8");
	}catch (e){
		result = "Not Found";
	}
	return result;
}

function getDate(){
	var date = new Date();
	return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var qo = url.parse(req.url,true).query;
	var origin = qo.origin;
	if (origin){
		res.end(readFile(origin));
	}else{
		res.end("Not Found");
	}
}).listen(8080);

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var qo = url.parse(req.url,true).query;
	var origin = qo.origin;
	var msg = qo.msg;
	if (origin || msg ){
		writeFile(origin, msg);
		res.end("1");
	}else{
		res.end("0");
	}
}).listen(8081);
