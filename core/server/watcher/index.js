var gaze = require('gaze');

function start (memcacheMan, callback) {
	
	// Watch all .js files/dirs in process.cwd()
	gaze(process.env.CONTENT_DIR + "/**/*.json", function(err, watcher) {
		// Files have all started watching
		// watcher === this

		// Get all watched files and initialize the Memento Manager with them
		memcacheMan.initialize(this.relative());

		// On changed/added/deleted
		this.on('all', function(event, filepath) {
			console.log(filepath + ' was ' + event);
		});
		
		callback();
		
	});
	

	
}

exports.start = start;