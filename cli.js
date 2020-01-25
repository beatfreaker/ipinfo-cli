#!/usr/bin/env node
'use strict';

var ipInfo = require('ipinfo');
var chalk = require('chalk');
var Table = require('cli-table');
var meow = require('meow');
var tbl = new Table({
	head: [chalk.magenta.bold('Title'), chalk.magenta.bold('Value')]
});

var cli = meow({
	help: [
		'Usage',
		'   - If an IP address is passed, information about it is',
		'     fetched and displayed.',
		'   - Otherwise, the current public address will be used.',
		'',
		'Examples',
		'',
		'   > ipinfo',
		'   > ipinfo 8.8.8.8',
		'',
		'Result',
		'',
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
		'   ├──────────┼──────────────────────────────────────────┤',
		'   │ timezone │ America/Los_Angeles                      │',
		'   └──────────┴──────────────────────────────────────────┘'
	]
});

var ignoredKeys = ['readme'];

ipInfo(cli.input[0], function (err, ipResults) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	if (ipResults.error) {
		console.error(ipResults.error);
		process.exit(1);
	}
	for (var key in ipResults) {
		if (ipResults.hasOwnProperty(key)) {
			if (ignoredKeys.indexOf(key) === -1) {
				var value = ipResults[key];
				tbl.push([chalk.cyan(key), chalk.green(value)]);
			}
		}
	}
	console.log(tbl.toString());
});
