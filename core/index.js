var server = require("./server");
var router = require("./server/router");
var watcher = require("./server/watcher");
var memento = require("./server/memento");
var r = require('./server/DataResolver.js');

/*
 * 
 * */
function startPartition () {
	watcher.start(memento.manager, function() {
		server.start(router);
	});
}

module.exports = startPartition;