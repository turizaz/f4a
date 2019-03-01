const generalSoket = require('socket.io')({
  path: '/chat/general',
});
module.exports = generalSoket;
