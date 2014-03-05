# [gulp](http://gulpjs.com)-local-screenshots [![Build Status](https://secure.travis-ci.org/danielhusar/gulp-local-screenshots.png?branch=master)](http://travis-ci.org/danielhusar/gulp-local-screenshots)

> Lorem ipsum


## Install

```
npm install --save-dev gulp-local-screenshots
```


## Example

```js
var gulp = require('gulp');
var localScreenshots = require('gulp-local-screenshots');

gulp.task('default', function () {
	gulp.src('src/app.ext')
		.pipe(localScreenshots())
		.pipe(gulp.dest('dist'));
});
```


## API

### localScreenshots(options)

#### options

##### foo

Type: `Boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Daniel Husar](https://github.com/danielhusar)
