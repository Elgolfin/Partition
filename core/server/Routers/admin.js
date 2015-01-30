var express = require('express');
var fs = require('fs');
var url = require('url');
var mu = require('mu2');
var dataResolver = require('../data/dataResolver');

function routerAdmin(app) {
    var router = express.Router();

    router.use(function (req, res, next) {
        //console.log('ADMIN %s %s %s'.green, req.method, req.url, req.path);
        next();
    });

    //router.use(function (req, res, next) {
    //    res.send('Hello Admin');
    //});

    router.use(function (req, res, next) {
        RenderJsonEditor(url.parse(req.url).pathname, res);
    });

    app.use('/admin', router);
}

function RenderJsonEditor(requestUrl, response) {
    var dataFile = dataResolver.resolve(requestUrl);
    if (dataFile.status_code === 200) {
      var stream = mu.compileAndRender('admin.html', { name: dataFile.apiUrl });
      stream.pipe(response);
    }
    if (dataFile.status_code === 404) {
        //console.log(("GET " + requestUrl + " 404").red.bold);
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end("<html><head></head><body>" + dataFile.relativeUrl + " not found</body></html>");
    }
}

module.exports = routerAdmin
