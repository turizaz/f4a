/* tslint:disable */

import * as Koa from 'koa'
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const serve = require('koa-static');
import * as fs from "fs"
import * as path from "path"
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'


import App from "./client/src/App";
app.use(router.routes());
app.use(serve('./client/build'));

router.get('/', async (ctx, next) => {
    const res = await rfs();
    console.log(res)
    ctx.body = res
});


app.listen(4001);

function rfs() {
    return new Promise((res, rej) => {
        fs.readFile(path.resolve('./client/build/index.html'), 'utf-8', (err, data) => {
            if(err) {
                return rej(err);
            }
            return res(data.replace(`<div id="root"></div>`, `<div id="root">${ReactDOMServer.renderToString(App)}</div>`))
        });
    })
}