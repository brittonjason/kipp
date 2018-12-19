let socket;
let player;
let players = [];

function keyPressed() {
  switch (keyCode) {
    case 65:
      player.dx -= player.speed;
      break;
    case 87:
      player.dy -= player.speed;
      break;
    case 68:
      player.dx += player.speed;
      break;
    case 83:
      player.dy += player.speed;
      break;
  }
};

function keyReleased() {
  switch (keyCode) {
    case 65:
      player.dx += player.speed;
      break;
    case 87:
      player.dy += player.speed;
      break;
    case 68:
      player.dx -= player.speed;
      break;
    case 83:
      player.dy -= player.speed;
      break;
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://localhost:3000');
  player = new Player(width/2, height/2);
  socket.on('connected', () => {
    player.id = socket.id;
    let data = {
      id: player.id,
      x: player.x,
      y: player.y
    }
    socket.emit('start', data);
    updatePlayer();

    socket.on('update', data => {
      players = data;
      console.log(players);
    });
  });
}

function draw() {
  background(0);
  player.update();
  players.forEach(player => {
    ellipse(player.x, player.y, 20);
  });

  if (player.dx !== 0 || player.dy !== 0) {
    updatePlayer();
  }
}

function updatePlayer() {
  let data = {
    id: player.id,
    x: player.x,
    y: player.y
  }
  socket.emit('update', data);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}