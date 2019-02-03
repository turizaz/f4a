'use strict';
const _ = require('lodash');
const games = require('../db/queries/games');
module.exports = {
  async add(ctx) {
    const {body} = ctx.request;
    const data = _.pick(ctx.request.body, [
      'players',
      'additional',
      'lat',
      'long',
      'address',
      'city_id',
    ].filter((it) => {
      return body[it] !== '';
    }));
    await games.addGame({
      author_id: ctx.user.id,
      ...data,
    });
    ctx.status = 201;
  },
};
