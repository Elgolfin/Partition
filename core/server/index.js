var express = require('express');
var logger = require('morgan');
var mu = require('mu2');

//process.env.NODE_ENV = "DEVELOPMENT";
mu.root = process.env.TPL_DIR;
//console.log(mu.root);


function start() {
    var app = express();
    
    app.use(logger('combined'));
    app.use(express.static(process.env.ASSETS_DIR));
    require('./routers/admin')(app);
    require('./routers/api')(app);
    require('./routers/assets')(app);
    require('./routers/web')(app);

    var server = app.listen(process.env.SRV_PORT_NUMBER, function () {
        console.log('Listening on port %d'.green.bold, server.address().port);
    });
}

exports.start = start;