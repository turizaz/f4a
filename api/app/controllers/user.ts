const pick = require('lodash/pick');
const User = require('../models/user');
const users = require('../db/queries/users');
export default {
  async get(ctx) {
    ctx.body = pick(ctx.userById.toObject(), User.publicFields);
  },
  async delete(ctx) {
    ctx.body = 'Deleted';
  },
  async patch(ctx) {
    const user = await users.updateUser({
      ...ctx.request.body,
      id: ctx.params.userById,
    });
    ctx.body = user[0];
  },
  async list(ctx) {
    const list = await User.find({});
    ctx.body = list.map((it) => pick(it, User.publicFields));
  },
};
