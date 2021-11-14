// https://www.tutorialsteacher.com/nodejs/node-inspector
import path from 'path'
import fs from 'fs';
fs.readFile(path.resolve(__dirname, '../http/http.ts'), 'utf8', function (err, data) {
    
    // eslint-disable-next-line no-debugger
    debugger;

    if (err) throw err;
    
    console.log(data);
});