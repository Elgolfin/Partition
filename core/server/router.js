var fs = require("fs");
var mu = require('mu2');
var filename, response, url;
var path = require('path');

/*
 * If directory, append index.json
 * If no directory, no extension, append .json
 * If no directory, any extension, change extension to json
 * If .json not found = 404
 * 
 * 
 * 
 * */
function Render(err, stats)
{
    if (process.env.NODE_ENV == 'DEVELOPMENT') {
        mu.clearCache();
    }
    
    if (!err) {
        //console.log(stats);
        if (stats.isDirectory()) {
            filename = path.normalize(filename + "/index.json");
            fs.stat(filename, Render);
        }
        else {
            console.log(("GET " + url + " 200").green.bold);
            var stream = mu.compileAndRender('authors.html', { name: filename });
            stream.pipe(response);
        }
	}
    else {
        //console.log((err.path + " does not exist").yellow);
        switch (path.extname(err.path)) {
            case ".json":
                if (path.basename(err.path, '.json') === "index") {
                    filename = path.normalize(err.path.replace("\\index.json", '.json'));
                    //console.log("index.json not found, fallback and looking for content in " + filename);
                    fs.stat(filename, Render);
                    return;
                }
                break;
            case "":
                filename = path.normalize(err.path + '.json');
                //console.log("No extension, fallback and looking for content in " + filename);
                fs.stat(filename, Render);
                return;
                break;
            default:
                filename = path.normalize(err.path.replace(path.extname(err.path), '.json'));
                //console.log("Extension different from .json, Fallback and looking for content in " + filename);
                fs.stat(filename, Render);
                return;
        }
        console.log(("GET " + url + " 404").red.bold);
        RenderPageNotFound()
	}
}

function RenderPageNotFound() {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end("<html><head></head><body>" + url + " not found</body></html>");
}

function route(pathname, res) {
	//console.log("About to route a request for " + pathname);
    
    url = pathname;
    response = res;
	// Look for the .json in the same directory and fill the cache (or invalidate it)
    filename = path.normalize(process.env.CONTENT_DIR + pathname);
	//console.log("Looking for content in " + filename);
    fs.stat(filename, Render);

}

module.exports.route = route;
module.exports.response = response;