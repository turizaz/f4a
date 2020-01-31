import { getByName } from '../db/queries/cities'
export = {
  getByName: async function(ctx) {
    const {name} = ctx.params;
    ctx.body = await getByName(name);
  },
};
