# AB-FS

A simple Promisified [FS](https://nodejs.org/api/fs.html) library that works how
I like it.

## Install

`npm install AlcaDesign/ab-fs`

## Example

```javascript
const fs = require('ab-fs');

fs.readFile('Some file to read')
.then(data => {
		/* ... */
	})
.catch(e => {
		/* ... */
	})
```

## API

### readFile ( `filename`, `options` )

### readFileUTF8 ( `filename`, `options` )

### readJSON ( `filename` )

### writeFile ( `filename`, `data`, `options` )

### writeJSON ( `filename`, `data` )

### writeJSONPretty ( `filename`, `data` )

### access ( `path`, `mode` )

### exists ( `path` )

---

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
