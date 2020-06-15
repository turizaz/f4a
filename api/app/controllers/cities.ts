import { getByName } from '../db/queries/cities'
export default {
  async getByName(ctx) {
    const {name} = ctx.params;
    ctx.body = await getByName(name);
  },
  async showEnv(ctx){
    ctx.body = JSON.stringify(process.env)
  },
};
