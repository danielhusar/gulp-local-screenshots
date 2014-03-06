'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var phantom = require('node-phantom-simple');
var http = require('http');
var st = require('st');
var options = {};


module.exports = function (options) {
  if (!options.foo) {
    throw new gutil.PluginError('gulp-local-screenshots', '`foo` required');
  }

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-local-screenshots', 'Streaming not supported'));
      return cb();
    }

    try {
      file.contents = new Buffer(file.contents.toString());
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-local-screenshots', err));
    }

    this.push(file);
    server(cb);
  });
};


options.local = {};
options.local.path = 'public';
options.local.port = '8080';
options.viewport = ['800x600'];
options.type = 'jpg';
options.path = 'screens';


// Core screenshot function using phamtonJS
var screenshot = function(opts, cb) {
  var viewport = opts.viewport;
  var url = opts.url;
  var filename = opts.filename;
  var type = opts.type;
  var path = opts.path;

  phantom.create(function(err, ph) {
    ph.createPage(function(err, page) {
      if (viewport) {
        var sets = viewport.match(/(\d+)x(\d+)/);
        if (sets[1] && sets[2]) {
          page.set('viewportSize', {
            width: sets[1],
            height: sets[2]
          });
        }
      }
      page.set('zoomFactor', 1);
      page.open(url, function(err, status) {
        var dest = filename + '.' + type;
        // Background problem under self-host server
        page.evaluate(function() {
          var style = document.createElement('style');
          var text = document.createTextNode('body { background: #fff }');
          style.setAttribute('type', 'text/css');
          style.appendChild(text);
          document.head.insertBefore(style, document.head.firstChild);
        });

        page.render(path + '/' + dest, function() {
          ph.exit();
          cb();
        });
      });
    });
  });
};

var server = function(cb){
  http.createServer(
  st({
    path: options.local.path
  })
).listen(options.local.port, function() {
    options.viewport.forEach(function(view, index) {
      var page = 'http://localhost:' + options.local.port + '/index.html';
      screenshot({
        path: options.path,
        filename: 'index.html',
        type: options.type,
        url: page,
        viewport: view
      }, cb);
    });
  });
};


