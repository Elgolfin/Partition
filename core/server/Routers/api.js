var express = require('express');
var fs = require('fs');
var url = require('url');
var dataResolver = require('../data/dataResolver');

function routerApi(app) {
    var router = express.Router();
    
    router.use(function (req, res, next) {
        //console.log('API %s %s %s'.green, req.method, req.url, req.path);
        next();
    });
    
    router.use(function (req, res, next) {
        RenderJson(url.parse(req.url).pathname, res);
    });

    app.use('/api', router);
}

function RenderJson(requestUrl, response) {
    var dataFile = dataResolver.resolve(requestUrl);
    if (dataFile.status_code === 200) {
        fs.createReadStream(dataFile.path).pipe(response);
    }
    if (dataFile.status_code === 404) {
        //console.log(("GET " + requestUrl + " 404").red.bold);
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("<html><head></head><body>" + dataFile.path + " not found</body></html>");
    }
}

module.exports = routerApi