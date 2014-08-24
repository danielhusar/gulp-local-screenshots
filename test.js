'use strict';

var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var sizeOf = require('image-size');
var localScreenshots = require('./index');
var dimensions;

it('It should generate properly screenshot', function (cb) {
  var stream = localScreenshots({height: 500});

  stream.on('data', function(){
  });

  stream.on('end', function(){
    console.log('\r\n');
    dimensions = sizeOf('screens/index-1024.jpg');
    assert.equal(dimensions.width, 1024);
    assert.equal(dimensions.height, 500);
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
