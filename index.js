var util = require('util');
var chalk = require('chalk');
var Orchestrator = require('orchestrator');
var timestamp = require('fireant-timestamp');
var gaze = require('gaze');
var fs = require('fs');
var global = require('global');
var gazes = {}; // Stores all the Gaze instances
var gazeId = 0;

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
    this.start.apply(this, arguments[0]);
};

// Reload tasks
Fireant.prototype.reload = function() {
    // Close all previously initialized Gaze instances,
    // since Gaze doesn't update existing listeners
    for (var id in gazes) {
        gazes[id].close();
    }
};

// Watch function
Fireant.prototype.watch = function(globals, callback) {
    gazes[gazeId] = gaze(globals, function() {
        this.on('all', function(error, file) {
            var start = new Date().getTime();
            console.log(timestamp(), chalk.white('Starting \'') + chalk.cyan('watch') + '\'...');
            callback(file);

            var end = new Date().getTime();
            var time = ((end - start) / 1000) + ' s';
            console.log(timestamp(), chalk.white('Finished \'') + chalk.cyan('watch') + '\' in ' + chalk.yellow(time));
        });
    });

    gazeId++;
};

Fireant.prototype.Fireant = Fireant;

// Assign instance
var inst = new Fireant();
module.exports = inst;
