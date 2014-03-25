var fs = require("fs");

function render(err, stats)
{
	if (!err) {
		//console.log(filename + " found.");
		console.log(stats);
	}
	else {
		var filename = process.env.CONTENT_DIR + pathname + ".json"
		console.log("Looking for content in " + filename);
		fs.stat(filename, render);
	}
}

function route(pathname) {
	console.log("About to route a request for " + pathname);
	
	var found = false;
	// Look for the .json in the same directory and fill the cache (or invalidate it)
	var filename = process.env.CONTENT_DIR + pathname + ".json"
	console.log("Looking for content in " + filename);
	fs.stat(filename, render);
	
	
	// if not fallback to directory and look for an index.json

	
	// if not redirect to 404 page

	
	// Get the content if it is a page (in the folder p_content + the pathname of the request)
	// If the content file get the associated template page
	// Render it with mustache
}

exports.route = route; 