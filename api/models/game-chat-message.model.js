'use strict';

const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema(
    {
      date: {type: Date},
      text: {type: String},
      username: {type: String},
      gameId: {type: Number},
    },
    {
      versionKey: false,
      collection: 'GameChatMessagesCollection',
    }
);
const MessageModel = mongoose.model('GameChatMessagesModel', MessageSchema);
MessageModel.add = function(message) {
  return new Promise((resolve, reject) => {
    this.create(message, (err, res) => {
      if (err) reject(res);
      resolve(res);
    });
  });
};
module.exports = MessageModel;
