var chalk = require('chalk');
var filesize = require('filesize');
var timestamp = require('./timestamp');
var fs = require('fs');

function FireantSave(file) {
    fs.writeFileSync(file, this.stdout || this.toString(), 'utf8');
    console.log(timestamp(), chalk.magenta(file) + ' ' + chalk.green(filesize(fs.statSync(file).size, {base: 10})));
    return this;
}

String.prototype.save = FireantSave;

module.exports = FireantSave;
