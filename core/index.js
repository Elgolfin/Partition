var server = require("./server");
var router = require("./server/router");
var watcher = require("./server/watcher");
var memento = require("./server/memento");

function startPartition () {
	watcher.start(memento.manager, function() {
		server.start(router.route);
	});
}

module.exports = startPartition;