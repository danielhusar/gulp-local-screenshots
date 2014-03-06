'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var phantom = require('phantom');
var http = require('http');
var st = require('st');

// Core screenshot function using phamtonJS
var browser = function(file, opts, cb) {
  var width = opts.width.slice(0);
  var filename = file.replace(opts.path, '');
  var url = 'http://localhost:' + opts.port + '/' + filename;
  var type = opts.type;
  var folder = opts.folder;

  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.set('zoomFactor', 1);
      var screenshot = function(w){
        if(!w) {
          ph.exit();
          setTimeout(cb, opts.timeout);
          width = opts.width.slice(0);
          return;
        }
        page.set('viewportSize', {
          width: w,
          height: '10'
        });

        page.open(url, function() {
          var dest = filename.replace('.html', '') + '-' + w + '.' + type;
          // Background problem under self-host server
          page.evaluate(function() {
            var style = document.createElement('style');
            var text = document.createTextNode('body { background: #fff }');
            style.setAttribute('type', 'text/css');
            style.appendChild(text);
            document.head.insertBefore(style, document.head.firstChild);
          });
          page.render(folder + '/' + dest, function() {
            gutil.log('gulp-local-screenshots:', gutil.colors.green('✔ ') + dest);
            screenshot(width.pop());
          });
        });
      };
      screenshot(width.pop());
    });
  });
};

module.exports = function (options) {
  var opts = {
    local: {}
  };
  var server;
  options = options ? options : {};

  //defaults
  opts.path = options.path || 'public';
  opts.port = options.port || '8080';
  opts.width = options.width || ['1024'];
  opts.type = options.type || 'jpg';
  opts.folder = options.folder || 'screens';
  opts.timeout = options.timeout || 200;

  return through.obj(function (file, enc, cb) {
    server = http.createServer(st({ path: opts.path })).listen(opts.port);

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-local-screenshots', 'Streaming not supported'));
      return cb();
    }

    this.push(file);
    browser(file.relative, opts, function(){
      server.close();
      cb();
    });

  });
};
