#!/usr/bin/env node
'use strict';

const ipInfo = require('ipinfo');
const chalk = require('chalk');
const Table = require('cli-table');
const meow = require('meow');
const tbl = new Table({
	head: [chalk.magenta.bold('Title'), chalk.magenta.bold('Value')]
});

const cli = meow({
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

const ignoredKeys = ['readme'];

ipInfo(cli.input[0], (err, ipResults) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	if (ipResults.error) {
		console.error(ipResults.error);
		process.exit(1);
	}

	for (const key in ipResults) {
		if (Object.prototype.hasOwnProperty.call(ipResults, key)) {
			if (!ignoredKeys.includes(key)) {
				const value = ipResults[key];
				tbl.push([chalk.cyan(key), chalk.green(value)]);
			}
		}
	}

	console.log(tbl.toString());
});
