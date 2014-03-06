'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var fs = require('fs');
var localScreenshots = require('./index');
var sizeOf = require('image-size');
var dimensions;

it('It should generate properly screenshot', function (cb) {
  var stream = localScreenshots();

  stream.on('data', function(){
  });

  stream.on('end', function(){
    console.log('\r\n');
    dimensions = sizeOf('screens/index-1024.jpg');
    assert.equal(dimensions.width, 1024);
    assert.equal(dimensions.height, 367);
    fs.unlinkSync('screens/index-1024.jpg');
    fs.rmdirSync('screens');
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/public/index.html',
    contents: new Buffer('unicorns')
  }));

  stream.end();
});
