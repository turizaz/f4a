const pick = require('lodash/pick');
const User = require('../models/user');

module.exports = {
  async loadUserById(ctx, next) {
    if (!ctx.mongoose.Types.ObjectId.isValid(ctx.params.userById)) {
      ctx.throw(404);
    }
    ctx.userById = await User.findById(ctx.params.userById);
    if (!ctx.userById) {
      ctx.throw(404);
    }
    await next();
  },
  async post(ctx) {
    const user = new User(pick(ctx.request.body, User.publicFields));
    await user.save();
    ctx.status = 201;
    ctx.body = {id: user.id};
  },
  async get(ctx) {
    ctx.body = pick(ctx.userById.toObject(), User.publicFields);
  },
  async delete(ctx) {
    ctx.userById.delete();
    ctx.body = 'Deleted';
  },
  async patch(ctx) {
    Object.assign(ctx.userById, pick(ctx.request.body, User.publicFields));
    await ctx.userById.save();
    ctx.body = pick(ctx.userById.toObject(), User.publicFields);
  },
  async list(ctx) {
    const list = await User.find({});
    ctx.body = list.map((it) => pick(it, User.publicFields));
  },
};
