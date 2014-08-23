var http = require("http");
var util = require("util");
var url = require("url");
var mu  = require('mu2');

//process.env.NODE_ENV = "DEVELOPMENT";
mu.root = process.env.TPL_DIR;
//console.log(mu.root);

function start(router) {
    function onRequest(request, response) {

		var pathname = url.parse(request.url).pathname;
		router.route(pathname, response);
		
    }
    try {
        console.log("Server is starting...".yellow.bold);
        http.createServer(onRequest).listen(process.env.SRV_PORT_NUMBER);
        console.log("Server has started. (listening on port :".green + process.env.SRV_PORT_NUMBER.green + ")".green + "\n");
    }
    catch (ex) {
        console.log(ex);
    }
}

exports.start = start;