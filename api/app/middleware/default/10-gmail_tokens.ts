import {google} from 'googleapis';
import * as fs from 'fs';
const file = JSON.parse(fs.readFileSync(__dirname+'/../gmail/test-265610-d2589ad59376.json').toString());

setInterval(()=>{console.log('pppppppppp')}, 1000)
console.log(file);
exports.init = (app) => app;
