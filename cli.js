#!/usr/bin/env node
'use strict';
var ipInfo = require('ipinfo');
var chalk = require('chalk');
var Table = require('cli-table');
var meow = require('meow');
var tbl = new Table({
    head: [chalk.magenta.bold('Title'), chalk.magenta.bold('Value')]
});
meow({
    help: [
        'Example',
        '   > ipinfo',
        '   ┌──────────┬──────────────────────────────────────────┐',
        '   │ Title    │ Value                                    │',
        '   ├──────────┼──────────────────────────────────────────┤',
        '   │ ip       │ 8.8.8.8                                  │',
        '   ├──────────┼──────────────────────────────────────────┤',
        '   │ hostname │ www.xyz.com                              │',
        '   ├──────────┼──────────────────────────────────────────┤',
        '   │ city     │ Mountain View                            │',
        '   ├──────────┼──────────────────────────────────────────┤',
        '   │ region   │ California                               │',
        '   ├──────────┼──────────────────────────────────────────┤',
        '   │ country  │ US                                       │',
        '   ├──────────┼──────────────────────────────────────────┤',
        '   │ loc      │ 37.4192,-122.0574                        │',
        '   ├──────────┼──────────────────────────────────────────┤',
        '   │ org      │ XYZ Inc.                                 │',
        '   ├──────────┼──────────────────────────────────────────┤',
        '   │ postal   │ 99999                                    │',
        '   └──────────┴──────────────────────────────────────────┘'
    ]
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
