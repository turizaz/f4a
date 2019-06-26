/* eslint-disable no-invalid-this */
const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Имя пользователя отсутствует.',
  },
  email: {
    type: String,
    unique: true,
    required: 'E-mail пользователя не должен быть пустым.',
    validate: [
      {
        validator: function checkEmail(value) {
          return this.deleted ?
            true :
            /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg: 'Укажите, пожалуйста, корректный email.',
      },
    ],
  },
  deleted: Boolean,
  passwordHash: {
    type: String,
    required: true,
  },
  salt: {
    required: true,
    type: String,
  },
}, {
  timestamps: true,
});

userSchema.virtual('password').set(function(password) {
  if (password !== undefined) {
    if (password.length < 4) {
      this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
    }
  }
  this._plainPassword = password;

  if (password) {
    this.salt = crypto.randomBytes(config.crypto.hash.length).
        toString('base64');
    this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length,
        'sha1',
    ).toString('base64');
  } else {
    this.salt = undefined;
    this.passwordHash = undefined;
  }
}).get(function() {
  return this._plainPassword;
});

userSchema.statics.publicFields = ['email', 'name', 'password'];

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  if (!this.passwordHash) return false;

  return crypto.pbkdf2Sync(
      password,
      this.salt,
      config.crypto.hash.iterations,
      config.crypto.hash.length,
      'sha1',
  ).toString('base64') === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
