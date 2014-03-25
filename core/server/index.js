var http = require("http");
var util = require("util");
var url = require("url");
var mu  = require('mu2');

//process.env.NODE_ENV = "DEVELOPMENT";
mu.root = process.env.TPL_DIR;
//console.log(mu.root);

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		route(pathname);
		
		if (process.env.NODE_ENV == 'DEVELOPMENT') {
			mu.clearCache();
		}
		var stream = mu.compileAndRender('authors.html', {name: "john"});
		util.pump(stream, response);
	}
	console.log("Server is starting...".yellow.bold);
	http.createServer(onRequest).listen(process.env.SRV_PORT_NUMBER);
	console.log("Server has started. (listening on port :".green + process.env.SRV_PORT_NUMBER.green +")".green + "\n");
}

exports.start = start;