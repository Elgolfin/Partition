var assert = require('chai').should()
    , path = require('path')
    , dataResolver = require('../core/server/DataResolver')
    , http = require('http')
    , sinon = require('sinon');


describe('Partition Test Suite ', function () {
    
    //beforeEach(function (done) {
    //    done();
    //});
    
    before(function () {
        process.env.ROOT_DIR = path.normalize(__dirname + "/../");
        process.env.CONTENT_DIR = process.env.ROOT_DIR + "/web/test/content";
        process.env.ERR_DIR = process.env.ROOT_DIR + "/web/test/errors";
    });
     
    describe('Data Resolver', function () {
        
        describe('Request \'/\'', function () {
            it('should return "/index.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/index.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/');
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/does-not-exist\'', function () {
            it('should return "/404.json"', function () {
                var expected = { 'path': path.normalize(process.env.ERR_DIR + "/404.json"), 'status_code': 404 };
                var result = dataResolver.resolve('/does-not-exist');
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/does-not-exist/deep/very/very/very/very/very/very/deep/\'', function () {
            it('should return "/404.json"', function () {
                var expected = { 'path': path.normalize(process.env.ERR_DIR + "/404.json"), 'status_code': 404 };
                var result = dataResolver.resolve('/does-not-exist/deep/very/very/very/very/very/very/deep/');
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/test\'', function () {
            it('should return "/test/index.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/test/index.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/test');
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/test/\'', function () {
            it('should return "/test/index.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/test/index.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/test/')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/test/test\'', function () {
            it('should return "/test/test.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/test/test.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/test/test')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/test/test/\'', function () {
            it('should return "/test/test.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/test/test.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/test/test/')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/test/test.html\'', function () {
            it('should return "/test/test.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/test/test.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/test/test.html')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/sample\'', function () {
            it('should return "/sample.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/sample.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/sample')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/sample/\'', function () {
            it('should return "/sample.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/sample.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/sample/')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/sample.\'', function () {
            it('should return "/sample.json"', function () {
                var expected = { 'path': path.normalize(process.env.CONTENT_DIR + "/sample.json"), 'status_code': 200 };
                var result = dataResolver.resolve('/sample.')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/sample..\'', function () {
            it('should return "/404.json"', function () {
                var expected = { 'path': path.normalize(process.env.ERR_DIR + "/404.json"), 'status_code': 404 };
                var result = dataResolver.resolve('/sample..')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });
        
        describe('Request \'/sa mple..\'', function () {
            it('should return "/404.json"', function () {
                var expected = { 'path': path.normalize(process.env.ERR_DIR + "/404.json"), 'status_code': 404 };
                var result = dataResolver.resolve('/samp le..')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });

        
        
        describe('Request \'/../../core/index.js\'', function () {
            it('should return "/404.json"', function () {
                var expected = { 'path': path.normalize(process.env.ERR_DIR + "/404.json"), 'status_code': 404 };
                var result = dataResolver.resolve('/../../core/index.js')
                result.should.deep.equal(expected);
                result.path.should.equal(expected.path);
                result.status_code.should.equal(expected.status_code);
            });
        });

    });
});