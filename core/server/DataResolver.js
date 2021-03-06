var fs = require("fs");
var path = require('path');

/*
 * If directory, append index.json
 * If no directory, no extension, append .json
 * If no directory, any extension, change extension to json
 * If .json not found = 404
 * 
 * */
function getDataFile(dataFile) {
    
    try {
        stats = fs.statSync(dataFile.path);
        if (stats.isDirectory()) {
            //console.log(dataFile + " is a directory, fallback to " + path.normalize(dataFile + "/index.json"));
            dataFile = getDataFile( { 'path': path.normalize(dataFile.path + "\\index.json"), 'status_code': null });
        }
        if (stats.isFile()) {
            dataFile.status_code = 200;
        }
	}
    catch(err) {
        //console.log(err.path + " does not exist");
        switch (path.extname(err.path)) {
            case ".json":
                if (path.basename(err.path, '.json') === "index") {
                    //console.log("index.json not found, fallback and looking for content in " + dataFile);
                    dataFile = getDataFile({ 'path': path.normalize(err.path.replace("\\index.json", '.json')), 'status_code': null });
                } else {
                    dataFile = { 'path': path.normalize(process.env.ERR_DIR + "\\404.json"), 'status_code': 404 };
                }
                break;
            case ".":
                dataFile = getDataFile({ 'path': path.normalize(err.path + 'json'), 'status_code': null });
                break;
            case "":
                dataFile = getDataFile({ 'path': path.normalize(err.path + '.json'), 'status_code': null });
                break;
            default:
                //console.log("Extension different from .json, Fallback and looking for content in " + dataFile);
                dataFile = getDataFile({ 'path': path.normalize(err.path.replace(path.extname(err.path), '.json')), 'status_code': null });
        }
    }

    return dataFile;
}

function resolve(relativePath) {
    
    var dataFile = getDataFile({ 'path': path.normalize(process.env.CONTENT_DIR + relativePath), 'status_code': null });
    return dataFile;

}

module.exports.resolve = resolve;