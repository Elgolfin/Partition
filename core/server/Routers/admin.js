var express = require('express');

function routerAdmin(app) {
    var router = express.Router();
    
    router.use(function (req, res, next) {
        //console.log('ADMIN %s %s %s'.green, req.method, req.url, req.path);
        next();
    });
    
    router.use(function (req, res, next) {
        res.send('Hello Admin');
    });

    app.use('/admin', router);
}

module.exports = routerAdmin