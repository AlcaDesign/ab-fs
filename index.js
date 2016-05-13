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

function readFile(filename, options) {
	return new Promise((resolve, reject) =>
			fs.readFile(filename, options || {}, (err, data) => {
					if(err) reject(err);
					else resolve(data);
				})
		);
}

function readFileUTF8(filename, options) {
	if(typeof options == 'object') {
		options.encoding = 'utf8';
	}
	return readFile(filename, options || 'utf8');
}

function readJSON(filename) {
	return readFileUTF8(filename)
		.then(data => JSON.parse(data));
}

function writeFile(filename, data, options) {
	return new Promise((resolve, reject) =>
			fs.writeFile(filename, data || '', options || {}, err => {
					if(err) reject(err);
					else resolve();
				})
		);
}

function writeJSON(filename, data) {
	return writeFile(filename, JSON.stringify(data));
}

function writeJSONPretty(filename, data) {
	return writeFile(filename, JSON.stringify(data, null, '\t'));
}

function access(path, mode) {
	return new Promise((resolve, reject) =>
			fs.access(path, mode, err => {
					if(err) reject(err);
					else resolve(true);
				})
		);
}

function exists(path) {
	return access(path)
		.catch(err => { throw false; });
}

module.exports = {
		readFile,
		readFileUTF8,
		readJSON,
		writeFile,
		writeJSON,
		writeJSONPretty,
		access,
		exists
	};
