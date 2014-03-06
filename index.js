'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var phantom = require('node-phantom-simple');
var http = require('http');
var st = require('st');


module.exports = function (options) {
  var opts = {
    local: {}
  };

  //defaults
  opts.path = options.path || 'public';
  opts.port = options.port || '8080';
  opts.width = options.width || ['1024', '800', '480', '320'];
  opts.type = options.type || 'jpg';
  opts.folder = options.folder ||'screens';

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-local-screenshots', 'Streaming not supported'));
      return cb();
    }

    server(file.relative, opts, cb);
    this.push(file);

  });
};


// Core screenshot function using phamtonJS
var screenshot = function(opts, cb) {
  var width = opts.width;
  var url = opts.url;
  var filename = opts.filename;
  var type = opts.type;
  var folder = opts.folder;

  phantom.create(function(err, ph) {
    ph.createPage(function(err, page) {
      page.set('viewportSize', {
        width: width,
        height: '10'
      });
      page.set('zoomFactor', 1);
      page.open(url, function() {
        var dest = filename.replace('.html', '') + '-' + width + '.' + type;

        // Background problem under self-host server
        page.evaluate(function() {
          var style = document.createElement('style');
          var text = document.createTextNode('body { background: #fff }');
          style.setAttribute('type', 'text/css');
          style.appendChild(text);
          document.head.insertBefore(style, document.head.firstChild);
        });

        page.render(folder + '/' + dest, function() {
          ph.exit();
          cb();
        });
      });
    });
  });
};

var server = function(file, options, cb){
  file = file.replace(options.path, '');
  var length  = options.port.length - 1;
  var callback;
  http.createServer(st({ path: options.path })).listen(options.port, function() {
    options.width.forEach(function(view, index) {
      callback = index === length ? cb : function(){};
      screenshot({
        folder: options.folder,
        filename: file,
        type: options.type,
        url: 'http://localhost:' + options.port + '/' + file,
        width: view
      }, callback);
    });
  });
};


