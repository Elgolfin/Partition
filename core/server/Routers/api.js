var express = require('express');

function routerApi(app) {
    var router = express.Router();
    
    router.use(function (req, res, next) {
        //console.log('API %s %s %s'.green, req.method, req.url, req.path);
        next();
    });
    
    router.use(function (req, res, next) {
        res.send('Hello API');
    });

    app.use('/api', router);
}

module.exports = routerApi