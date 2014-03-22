var server = require("./server");
var router = require("./server/router");

function startPartition () {
	server.start(router.route);
}

module.exports = startPartition;
