'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var localScreenshots = require('./index');

it('should ', function (cb) {
  var stream = localScreenshots();

  //TODO
  stream.on('data', function (file) {
    assert.equal(file.relative, 'public/index.html');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/public/index.html'
  }));

  stream.end();
});
