# Fireant

Simple JavaScript Task Runner.

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
fire watch
```

## Thanks

Fireant is inspired by the work of Tero Piirainen on a very early version. Based on [Gulp.js](https://github.com/gulpjs).
