var colors = require('colors');
var path = require('path');
//var _ = require('underscore');

process.env.NODE_ENV = 'DEVELOPMENT';

process.env.ROOT_DIR = path.normalize(__dirname);
process.env.CONTENT_DIR = path.normalize(process.env.ROOT_DIR + "/web/current/content");
process.env.ERR_DIR = path.normalize(process.env.ROOT_DIR + "/web/current/errors");
process.env.TPL_DIR = path.normalize(process.env.ROOT_DIR + "/web/current/templates");
process.env.ASSETS_DIR = path.normalize(process.env.ROOT_DIR + "/web/current/assets");
process.env.SRV_PORT_NUMBER = "8888";

var Partition = require('./core');

Partition();
