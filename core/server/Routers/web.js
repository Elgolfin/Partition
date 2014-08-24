var express = require('express');
var mu = require('mu2');
var dataResolver = require('../DataResolver');
var url = require("url");

function routerWeb(app) {
    var routerWeb = express.Router();
    
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    routerWeb.use(function (req, res, next) {
        //console.log('WEB %s %s %s'.green, req.method, req.url, req.path);
        next();
    });
    
    // this will only be invoked if the path ends in /bar
    //routerWeb.use('/bar', function (req, res, next) {
    //    next();
    //});
    
    routerWeb.use(function (req, res, next) {
        RenderPage(url.parse(req.url).pathname, res);
    });

    app.use('/', routerWeb);

}

function RenderPage(requestUrl, response) {
    var dataFile = dataResolver.resolve(requestUrl);
    if (dataFile.status_code === 200) {
        //console.log(("GET " + requestUrl + " 200").green.bold);
        
        if (process.env.NODE_ENV == 'DEVELOPMENT') {
            mu.clearCache();
        }
        
        var stream = mu.compileAndRender('authors.html', { name: dataFile.path });
        stream.pipe(response);
    }
    if (dataFile.status_code === 404) {
        //console.log(("GET " + requestUrl + " 404").red.bold);
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("<html><head></head><body>" + dataFile.path + " not found</body></html>");
    }
}

module.exports = routerWeb;