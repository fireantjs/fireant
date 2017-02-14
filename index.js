var util = require('util');
var chalk = require('chalk');
var Orchestrator = require('orchestrator');
var timestamp = require('./lib/timestamp');
var gaze = require('gaze');
var fs = require('fs');
var global = require('global');

require('./lib/fireant-core');

function Fireant() {
    Orchestrator.call(this);
}

// Make Fireant act like Orchestrator
util.inherits(Fireant, Orchestrator);

// Task function
Fireant.prototype.task = Fireant.prototype.add;

// Run task
Fireant.prototype.run = function() {
    var tasks = arguments.length ? arguments : false;

    if (tasks) {
        this.start.apply(this, tasks);
    } else {
        console.log(timestamp(), chalk.red('No tasks specified'));
    }
};

// Watch function
Fireant.prototype.watch = function(globals, callback) {
    gaze(globals, function() {
        this.on('all', function(error, file) {
            var start = new Date().getTime();
            console.log(timestamp(), chalk.white('Starting \'') + chalk.cyan('watch') + '\'...');
            callback(file);

            var end = new Date().getTime();
            var time = ((end - start) / 1000) + ' s';
            console.log(timestamp(), chalk.white('Finished \'') + chalk.cyan('watch') + '\' in ' + chalk.yellow(time));
        });
    });
};

Fireant.prototype.Fireant = Fireant;

var inst = new Fireant();
module.exports = inst;
