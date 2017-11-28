let io = null;

module.exports = {
    init: function(server) {
      io = require('socket.io')(server);
      io.on('connection', function(socket){
        console.log('a user connected');
        let boardKey = socket.handshake.query.key; 
        socket.join(boardKey);   
      });
    },
    instance: function() {
      return io;
    }
  }