var http = require("http");
var util = require("util");
var url = require("url");
var mu  = require('mu2');

//process.env.NODE_ENV = "DEVELOPMENT";
mu.root = process.env.ROOT_DIR + '/web/templates';
console.log(mu.root);

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
	http.createServer(onRequest).listen(8888);
	console.log(process.env);
	console.log("Server has started.");
}

exports.start = start;