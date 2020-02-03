'use strict';
import {IMessage} from "../db/queries/Imessage";

const _ = require('lodash');
const games = require('../db/queries/games');
const {GAME_CHAT_ROOM_PREFIX} = process.env;
import {saveMessage, getMessages} from '../db/queries/messages'

export default {
  /**
   * Add game, notify client
   * @param {object} ctx
   * @return {Promise<void>}
   */
  async add(ctx) {
    const {body} = ctx.request;
    const data = _.pick(
        ctx.request.body,
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
          return body[it] !== '';
        })
    );
    const id = await games.addGame({
      author_id: ctx.user.id,
      ...data,
    });
    ctx.ioGeneral.emit('GAME_ADDED', id);
    ctx.status = 201;
  },
  async get(ctx) {
    const {id} = ctx.params;
    ctx.body = await games.get(id);
    ctx.body.fieldNumbersInGame = await games.playerInGame(id);
  },
  /**
   * Get list based on city
   * @param {object} ctx
   * @return {Promise<void>}
   */
  async list(ctx) {
    const {id} = ctx.params;
    const {rows} = await games.gamesForCity(id);
    ctx.body = rows;
  },
  /**
   * @param {object} ctx
   * @return {Promise<void>}
   */
  async join(ctx) {
    if (!ctx.user) {
      ctx.status = 403;
      return;
    }
    const {id} = ctx.user;
    const {gameId, playerNumber} = ctx.request.body;
    const playersInGame = await games.join(id, gameId, playerNumber);
    console.log('pl', playersInGame);
    if (playersInGame) {
      ctx.ioGeneral.emit('PLAYER_JOINED', playersInGame);
    }
    ctx.status = 200;
  },
  /**
   * Store message to db and emit to socket
   * @param {object} ctx
   * @return {Promise<void>}
   */
  async addChatMessage(ctx) {
    const {message, gameId} = ctx.request.body;
    if (!message) {
      ctx.status = 400;
      return;
    }
    if (!ctx.user) {
      ctx.status = 403;
      return;
    }
    const {name, id} = ctx.user;
    // store
    const savedMessage: IMessage = await saveMessage(message, id, gameId);
    // notify client
    ctx.ioGame
        .to(GAME_CHAT_ROOM_PREFIX+gameId)
        .emit('GAME_CHAT_MESSAGE_ADDED', {
          id: savedMessage.id,
          username: name,
          text: savedMessage.text,
          date: savedMessage.date,
        });
    ctx.status = 200;
  },
  async getChatHistory(ctx) {
    const {gameId} = ctx.params
    const messages = getMessages(gameId)
    ctx.ioGame
        .to(GAME_CHAT_ROOM_PREFIX+gameId)
        .emit('GAME_CHAT_MESSAGE_HISTORY', await messages);
    ctx.status = 200;
  },
};
