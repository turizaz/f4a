import knex from '../../libs/knex'
import {JWT_REFRESH_TTL} from '../../services/auth'

async function storeRefreshToken(data) {
    const trx = await knex.transaction()
    try {
        await trx('refresh_tokens').where({user_id: data.user_id}).delete()
        await trx('refresh_tokens').insert(data)
        await trx.commit();
    } catch (e) {
        await trx.rollback();
    }
}

function checkRefreshToken(id: string): Promise<{id: string, user_id: string}> {
    if (!id) {
        throw new Error('Invalid arguments');
    }
    return knex('refresh_tokens')
        .where({id})
        .andWhere('timestamp', '>', knex.raw(`NOW() - INTERVAL '${JWT_REFRESH_TTL}'`))
        .select('id', 'user_id')
        .first()
}
export default {
    storeRefreshToken,
    checkRefreshToken,
}
