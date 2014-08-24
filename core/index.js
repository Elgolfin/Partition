var server = require("./server");
var watcher = require("./server/watcher");
var memento = require("./server/memento");

/*
 * 
 * */
function startPartition () {
	watcher.start(memento.manager, function() {
		server.start();
	});
}

module.exports = startPartition;