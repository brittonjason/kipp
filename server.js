let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(process.env.PORT || 3000, listen);

function listen() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('App listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

class Player {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

let players = [];

io.on('connection', function(socket) {
  console.log("Client " + socket.id + " connected");
  socket.emit('connected');

  socket.on('start', data => {
    players.push(new Player(data.id, data.x, data.y));
    console.log(players);
    io.sockets.emit('update', players);
  })

  socket.on('update', data => {
    players.forEach(player => {
      if (socket.id === player.id) {
        player.x = data.x;
        player.y = data.y;
      }
    });
    io.sockets.emit('update', players);
    console.log(players);
  });

  socket.on('disconnect', () => {
    console.log("Client " + socket.id + " disconnected");
    players.forEach((player, index) => {
      if (socket.id === player.id) {
        players.splice(index, 1);
      }
    });
    io.sockets.emit('update', players);
    console.log(players);
  });
});