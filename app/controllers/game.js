'use strict';
const _ = require('lodash');
module.exports = {
  async add(ctx) {
    console.log(process.env);
    ctx.body = 'add';
  },
};
