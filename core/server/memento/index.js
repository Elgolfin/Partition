var memcache = require("node-cache");

var myCache = new memcache();

var manager = {
    initialize: function (files) {
        console.log("Memento Manager is initializing...".yellow.bold);
        
        myCache.on("set", function () {
            console.log((arguments[0] + " has been added to the cache").green);
        });

        for (var dir in files) {
            console.log("Processing folder ".yellow + dir.yellow);
            for (var i = 0; i < files[dir].length; i++) {
                if (files[dir][i].substr(files[dir][i].length - 1) === "\\") continue; /// Nothing to cache, it is a repertory
                if (!myCache.set(dir + files[dir][i], { 'foo': 'bar' })) {
                    console.log((dir + files[dir][i] + " has not been added to the cache").red.bold);
                }               
            }
        }

        var result = require('util').format("Cache stats: %j", myCache.getStats());
        //console.log(myCache.data);
        console.log(result.bold);
		console.log("Memento Manager has been initialized.".green + "\n");
	}
}

exports.manager = manager;