'use strict';
const _ = require('lodash');
const games = require('../db/queries/games');
const GameChatMessagesModel = require('../models/game-chat-message.model');
require('dotenv').config();
const {GAME_CHAT_ROOM_PREFIX} = process.env;
const GameChatModel = require('../models/game-chat-message.model');
module.exports = {
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
    const {name} = ctx.user;
    // store to mongo
    const res = await GameChatMessagesModel.add({
      date: new Date(),
      text: message,
      username: name,
      gameId,
    });
    // notify client
    ctx.ioGame
        .to(GAME_CHAT_ROOM_PREFIX+gameId)
        .emit('GAME_CHAT_MESSAGE_ADDED', {
          id: res._id,
          username: name,
          text: message,
          date: new Date(),
        });
    ctx.status = 200;
  },
  async getChatHistory(ctx) {
    const {gameId} = ctx.params;
    const messages = await GameChatModel.find({gameId})
        .sort({date: -1})
        .lean()
        .exec();
    for (const message of messages) message.id = message._id;
    ctx.ioGame
        .to(GAME_CHAT_ROOM_PREFIX+gameId)
        .emit('GAME_CHAT_MESSAGE_HISTORY', messages);
    ctx.status = 200;
  },
};
