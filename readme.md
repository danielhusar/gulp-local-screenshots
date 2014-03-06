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

## Options


#### path

Type: `String`  
Default: 'public'

Path from which the static files are served (this string is removed from file relative path so be carefull and dont put just '/')

#### port

Type: `Number`  
Default: '8080'

Port for the statis web server

#### width

Type: `Array`  
Default: ['1024']

Array of page widths to make screenshots (for the responsive website)

#### height

Type: `String`  
Default: '10'

Height of the page, if the actual page heights is more than that it, iamge will have actual page height.
(specifing height is good for testing)

#### type

Type: `String`  
Default: 'jpg'

Output image extension

#### folder

Type: `String`  
Default: 'screens'

Folder where to put images

#### timeout

Type: `Number`  
Default: '200'

Timeout between files, in most cases you dont need to change that


## Demo

![Demo](demo.gif)

## License

MIT © [Daniel Husar](https://github.com/danielhusar)
