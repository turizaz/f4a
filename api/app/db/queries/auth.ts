import knex from '../../libs/knex'
import {JWT_REFRESH_TTL} from '../../services/auth'

function storeRefreshToken(data) {
    return knex('refresh_tokens').insert(data)
}
function removeRefreshToken(id: string): Promise<number> {
    return knex('refresh_tokens').where({id}).delete()
}
function checkRefreshToken(id: string): Promise<{id: string, user_id: string}> {
    return knex('refresh_tokens')
        .where({id})
        .andWhere('timestamp', '>', knex.raw(`NOW() - INTERVAL '${JWT_REFRESH_TTL}'`))
        .select('id', 'user_id')
        .first()
}
export default {
    storeRefreshToken,
    checkRefreshToken,
    removeRefreshToken
}