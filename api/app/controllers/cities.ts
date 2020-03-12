import { getByName } from '../db/queries/cities'
export = {
  async getByName(ctx) {
    const {name} = ctx.params;
    ctx.body = await getByName(name);
  },
};
