/*
Copyright 2016 Alca

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

const fs = require('fs');

let readFile = promisify('readFile'),
	writeFile = promisify('writeFile');

function promRes(resolve, reject) {
	return (err, data) => {
			if(err) {
				return reject(err);
			}
			return resolve(data);
		};
}

function promisify(name) {
	return (...args) => new Promise((resolve, reject) => {
			args.push(promRes(resolve, reject));
			fs[name].apply(fs, args);
		});
}

function access(path, mode) {
	return new Promise((resolve, reject) =>
			fs.access(
				path,
				mode,
				err => {
					if(err) reject(err);
					else resolve(true);
				}
			)
		);
}

function exists(path) {
	return access(path)
	.catch(err => { throw false; });
}

function readFileUTF8(file, options) {
	if(typeof options == 'object') {
		options.encoding = 'utf8';
	}
	return readFile(
			file,
			options || 'utf8'
		);
}

function readJSON(file) {
	return readFileUTF8(file)
		.then(data => JSON.parse(data));
}

function writeJSON(file, data) {
	return writeFile(
			file,
			JSON.stringify(data || {})
		);
}

function writeJSONPretty(file, data) {
	return writeFile(
			file,
			JSON.stringify(
					data,
					null,
					'\t'
				)
		);
}

module.exports = {
	access,
	createReadStream: fs.createReadStream,
	createWriteStream: fs.createWriteStream,
	exists,
	readFile,
	readFileUTF8,
	readJSON,
	unwatchFile: fs.unwatchFile,
	watch: fs.watch,
	watchFile: fs.watchFile,
	writeFile,
	writeJSON,
	writeJSONPretty
};

[	'appendFile', 'chmod', 'chown', 'close', 'fchmod', 'fchown', 'fdatasync',
	'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod', 'lchown', 'link',
	'lstat', 'mkdir', 'mkdtemp', 'open', 'read', 'readdir', 'readlink',
	'realpath', 'rename', 'rmdir', 'stat', 'symlink', 'truncate', 'unlink',
	'utimes', 'write'
]
.map(n => {
		module.exports[n] = promisify(n);
	});
