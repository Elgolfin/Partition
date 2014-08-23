var fs = require("fs");
var mu = require('mu2');
var path = require('path');
var dataResolver = require('./DataResolver.js');

function RenderPage(requestUrl, response) {
    var dataFile = dataResolver.resolve(requestUrl);
    if (dataFile.status_code === 200) {
        console.log(("GET " + requestUrl + " 200").green.bold);
        
        if (process.env.NODE_ENV == 'DEVELOPMENT') {
            mu.clearCache();
        }

        var stream = mu.compileAndRender('authors.html', { name: dataFile.path });
        stream.pipe(response);
    }
    if (dataFile.status_code === 404) {
        console.log(("GET " + requestUrl + " 404").red.bold);
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("<html><head></head><body>" + dataFile.path + " not found</body></html>");
    }
}

function route(requestUrl, response) {
    
    RenderPage(requestUrl, response);

}

module.exports.route = route;