var express = require('express');

function routerAssets(app) {
    var router = express.Router();
    
    router.use(function (req, res, next) {
        //console.log('ASSETS %s %s %s'.green, req.method, req.url, req.path);
        next();
    });
    
    router.use(function (req, res, next) {
        res.send('Hello Assets');
    });

    app.use('/assets', router);
}

module.exports = routerAssets