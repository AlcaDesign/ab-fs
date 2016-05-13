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
