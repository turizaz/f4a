import {IMessage} from '../db/queries/interfaces/Imessage'
import games from '../db/queries/games'
import {_} from 'lodash'
import {saveMessage, getMessages} from '../db/queries/messages'
import config from '../config'
import {CANT_PROCESS_ENTITY} from "../templates/errors";

export default {
    async add(ctx)
    {
        const data = prepare(ctx.request.body);
        const id = await games.addGame({
            author_id: ctx.req.user.id,
            ...data,
        });
        ctx.ioGeneral.emit('GAME_ADDED', id);
        ctx.status = 201;

        function prepare(body: any) {
            return _.pick(
                body,
                [
                    'players',
                    'additional',
                    'lat',
                    'long',
                    'address',
                    'city_id',
                    'district',
                    'date',
                ].filter((it) => {
                    return body[it] !== ''
                })
            );
        }
    },

  async get(ctx)
  {
    const {id} = ctx.params;
    ctx.body = await games.get(id);
    ctx.body.fieldNumbersInGame = await games.playerInGame(id);
  },

  async list(ctx)
  {
    const {id} = ctx.params;
    const {rows} = await games.gamesForCity(id);
    ctx.body = rows;
  },

  async join(ctx)
  {
    const {id} = ctx.req.user;
    const {gameId, playerNumber} = ctx.request.body;
    const playersInGame = await games.join(id, gameId, playerNumber);
    ctx.ioGeneral.joinGame(playersInGame);
    ctx.status = 200;
  },

  async addChatMessage(ctx)
  {
    const {message, gameId} = ctx.request.body;
    if (!message || 1) {
        throw CANT_PROCESS_ENTITY
    }
    const {name, id} = ctx.req.user;
    const savedMessage: IMessage = await saveMessage(message, id, gameId);
    ctx.ioGame
        .to(config.GAME_CHAT_ROOM_PREFIX+gameId)
        .emit('GAME_CHAT_MESSAGE_ADDED', {
          id: savedMessage.id,
          username: name,
          text: savedMessage.text,
          date: savedMessage.date,
        });
    ctx.status = 201
  },
  async getChatHistory(ctx)
  {
    const {gameId} = ctx.params;
    const messages = getMessages(gameId);
    ctx.ioGame
        .to(config.GAME_CHAT_ROOM_PREFIX+gameId)
        .emit('GAME_CHAT_MESSAGE_HISTORY', await messages);
    ctx.status = 200;
  },
};
