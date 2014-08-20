var colors = require('colors');
//var _ = require('underscore');

process.env.NODE_ENV = 'DEVELOPMENT';

process.env.ROOT_DIR = __dirname;
process.env.CONTENT_DIR = process.env.ROOT_DIR + "/web/current/content";
process.env.TPL_DIR = process.env.ROOT_DIR + "/web/current/templates";
process.env.SRV_PORT_NUMBER = "8888";

var Partition = require('./core');

Partition();