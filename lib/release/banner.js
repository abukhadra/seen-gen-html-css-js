import * as fs from 'fs'

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { version } = require('../../package.json')


fs.readFile('./dist/sgen-html-css-js.js', 'utf8', (err, data) => {
    if (err) { console.error(err); return; }
    fs.writeFile('./dist/sgen-html-css-js.js', `/*version: ${version}*/\n${data}` , err => {
        if (err) { console.error(err);  return; }
    });
})