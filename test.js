'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var localScreenshots = require('./index');

it('should ', function (cb) {
  var stream = localScreenshots({foo: 'foo'});

  stream.on('data', function (file) {
    assert.equal(file.relative, 'public/index.html');
    assert.equal(file.contents.toString(), 'unicorns');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/public/index.html',
    contents: new Buffer('unicorns')
  }));

  stream.end();
});
