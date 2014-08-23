var memcache = require("node-cache");
var myCache = new memcache();

var manager = {
    initialize: function (files) {
        console.log("Memento Manager is initializing...".yellow.bold);
        
        for (var dir in files) {
            for (var i = 0; i < files[dir].length; i++) {
                console.log(dir + files[dir][i]);
                if (!myCache.set(dir + files[dir][i], { 'foo': 'bar' })) {
                    console.log((dir + files[dir][i] + " has not been added to the cache").red.bold);
                }               
            }
        }

        var result = require('util').format("Cache stats: %j", myCache.getStats());
        console.log(result.bold);
		console.log("Memento Manager has been initialized.".green + "\n");
	}
}

exports.manager = manager;