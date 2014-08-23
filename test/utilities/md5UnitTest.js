var assert = require('chai').should()
    , md5 = require('../../core/utilities/md5.js')
    , sinon = require('sinon');


    
describe('MD5 Test Suite', function () {
        
    describe('md5("") (empty string)', function () {
        it('should return "d41d8cd98f00b204e9800998ecf8427e"', function () {
            var expected = "d41d8cd98f00b204e9800998ecf8427e";
            var result = md5('');
            result.should.equal(expected);
        });
    });

    describe('md5("hello\\n") (five bytes plus linefeed)', function () {
        it('should return "b1946ac92492d2347c6235b4d2611184"', function () {
            var expected = "b1946ac92492d2347c6235b4d2611184";
            var result = md5("hello\n");
            result.should.equal(expected);
        });
    });

    describe('md5(" ") (a single space)', function () {
        it('should return "7215ee9c7d9dc229d2921a40e899ec5f"', function () {
            var expected = "7215ee9c7d9dc229d2921a40e899ec5f";
            var result = md5(' ');
            result.should.equal(expected);
        });
    });

    describe('md5("HTML") (four bytes)', function () {
        it('should return "4c4ad5fca2e7a3f74dbb1ced00381aa4"', function () {
            var expected = "4c4ad5fca2e7a3f74dbb1ced00381aa4";
            var result = md5('HTML');
            result.should.equal(expected);
        });
    });
    
    describe('md5("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")' + "\n\t(list of the sixty-four Base64 alphabet characters)", function () {
        it('should return "7845f7eade89338adabfef89bd6e9a5b"', function () {
            var expected = "7845f7eade89338adabfef89bd6e9a5b";
            var result = md5("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
            result.should.equal(expected);
        });
    });

});
