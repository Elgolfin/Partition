//var server = require("./core/server");
//var router = require("./core/router");

process.env.NODE_ENV = 'DEVELOPMENT';
process.env.ROOT_DIR = __dirname;
//console.log(process.env.ROOT_DIR);

var Partition = require('./core');

Partition();