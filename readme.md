# [gulp](http://gulpjs.com)-local-screenshots [![Build Status](https://secure.travis-ci.org/danielhusar/gulp-local-screenshots.png?branch=master)](http://travis-ci.org/danielhusar/gulp-local-screenshots)

This plugin will make the screenshots of your static html files using phantomjs.
(make sure you have phantomjs installed on your machine)


## Install

```
npm install --save-dev gulp-local-screenshots
```

## Example

```
var gulp = require('gulp');
var localScreenshots = require('gulp-local-screenshots');

gulp.task('screens', function () {
  gulp.src('./public/*.html')
  .pipe(localscreenshots({
    width: ['1600', '1000', '480', '320']
   }))
  .pipe(gulp.dest('./public/'));
});

```

## API

```
{
  path  : 'public',   // path from which the static files are served (this string is removed from file relative path so be carefull and dont put just '/')
  port : '8080',      // port for the statis web server
  width : ['1024'],   // array of page widths to make screenshots (for the responsive website)
  type : 'jpg',       // output image ext 
  folder : 'screens', // folder where to put images
  timeout : 200       // timeone between files, in most cases you dont need to change that
}

```

## Demo

![Demo](demo.gif)

## License

MIT © [Daniel Husar](https://github.com/danielhusar)
