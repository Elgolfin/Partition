var memcache = require("node-cache");

var manager = {
	initialize: function (files) {
		console.log("Memento Manager is initializing...".yellow.bold);
		
		for (var dir in files) {
		    for(var i = 0; i < files[dir].length; i++) {
                console.log(dir + files[dir][i]);
                //TODO put the file in the cache manager
			}
        }
		console.log("Memento Manager has been initialized.".green + "\n");
	}
}

exports.manager = manager;