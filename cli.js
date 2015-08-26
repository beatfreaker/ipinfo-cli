var ipInfo = require('ipinfo');
var chalk = require('chalk');
var Table = require('cli-table');
var tbl = new Table({
    head: [chalk.magenta.bold('Title'), chalk.magenta.bold('Value')]
});

ipInfo(function (err, currIpInfo) {
    if (err) {
        return;
    }
    for (var key in currIpInfo) {
        if (currIpInfo.hasOwnProperty(key)) {
            tbl.push([chalk.cyan(key), chalk.green(currIpInfo[key])]);
        }
    }
    console.log(tbl.toString());
});
