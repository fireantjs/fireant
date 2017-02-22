<p align="center"><img src="https://raw.githubusercontent.com/fireantjs/artwork/master/fireant-text-horizontal-small.png" width="400" height="119" alt="Fireant"></p>

# Fireant

JavaScript Task Runner. Less code, everywhere.

## Installation

```shell
npm install -g fireant-cli
npm install -D fireant
touch fireantfile.js
```

## Sample fireantfile.js

```javascript
var fireant = require("fireant");
var stylus = require("fireant-stylus");

// Tasks
fireant.task("watch", function() {
	fireant.watch("css/*.styl", function(file) {
    	stylus("css/index.styl").save("html/css/styles.css");
	});
});
```

## Sample fireantfile.js with options

Fireant uses ```global``` options for plugins.

```javascript
var fireant = require("fireant");
var stylus = require("fireant-stylus");
var uglify = require("fireant-uglify");
var global = require("global");

// Options
global.options = { 
    stylus: {
        minify: {
            disabled: false, // set to true to disable minify
            compatibility: "ie9",
            keepBreaks: false,
            keepSpecialComments: 0,
            mediaMerging: true,
            sourceMap: false
        },
        autoprefixer: {
            disabled: false, // set to true to disable autoprefixer
            browsers: ["last 2 versions"]
        }
    },
    uglify: {
        preserveComments: false,
        compress: true,
        mangle: true
    }
};

// Tasks
fireant.task("watch", function() {
	fireant.watch("css/*.styl", function(file) {
    	stylus("css/index.styl").save("html/css/styles.css");
	});

	fireant.watch("js/*.js", function(file) {
		uglify([
            "js/common.js",
            "js/app.js"
        ]).save("html/js/common.min.js");
    });
});
```
## Usage

```shell
fire [tasks]
```

## Contributing

Please do.

When developing plugins, keep in mind that every plugin should:

* be able to receive a file name (or an array of filenames) as first argument — or —
* get the result (string) from previous method if the argument is empty

Like this:

```javascript
stylus("css/index.styl").autoprefixer().yourplugin().save("html/css/styles.css");
```

Or:

```javascript
autoprefixer("css/index.styl").yourplugin().save("html/css/styles.css");
```

## Release history

- 0.0.13 - Fireant looks for changes in ```fireantfile.js``` and reloads the file
- 0.0.12 - Press "q" to stop Fireant
- 0.0.1 - Initial release

See [changelog](https://github.com/fireantjs/fireant/blob/master/CHANGELOG.md) for other changes.

## Thanks

Fireant is inspired by the work of Tero Piirainen on a very early version. Based on [Gulp.js](https://github.com/gulpjs).
