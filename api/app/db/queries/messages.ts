import knex from '../../libs/knex'
import {IMessage} from './Imessage'

async function saveMessage(text: string, userId: number, gameId: number): Promise<IMessage> {
        return knex('messages')
            .insert({
                    text,
                    user_id: userId,
                    game_id: gameId
                })
        .returning(['id', 'text', 'date'])
        .then((res)=> res[0]);
}
async function getMessages(gameId) {
    return knex
        .select('messages.id as id',
                'users.name as username',
                'messages.date as date',
                'messages.text as text')
        .from('messages')
        .leftJoin('users', 'messages.user_id', 'users.id')
        .orderBy('date','desc')
        .where('game_id', gameId)
}
export {
    saveMessage,
    getMessages
}
