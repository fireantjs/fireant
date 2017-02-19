var chalk = require('chalk');
var filesize = require('filesize');
var timestamp = require('fireant-timestamp');
var figures = require('figures');
var fs = require('fs');

function FireantSave(file) {
    var str = this.toString();

    if (str.length > 0) {
        fs.writeFileSync(file, str, 'utf8');
        console.log(timestamp(), chalk.green(figures.tick), chalk.magenta(file) + ' ' + chalk.green(filesize(fs.statSync(file).size, {base: 10})));
    } else {
        console.log(timestamp(), figures.cross, chalk.red.bold('WARNING!'), chalk.red('Refused to write empty file'));
    }
}

String.prototype.save = FireantSave;

module.exports = FireantSave;
