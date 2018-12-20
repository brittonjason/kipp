let socket;
let player;
let players = [];
let world;

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
  player = new Player(100, 100);
  socket.on('connected', () => {
    player.id = socket.id;
    let data = {
      id: player.id,
      x: player.x,
      y: player.y
    }
    socket.emit('start', data);
    updatePlayer();

    socket.on('world', data => world = data);

    socket.on('update', data => {
      players = data;
    });
  });
}

function draw() {
  background(0);

  drawWorld();  
  drawOtherPlayers();
  player.update();
  player.draw();

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

function drawWorld() {
  if (!world) return;

  noStroke();
  fill(140);

  push();
  translate(width/2-player.x, height/2-player.y);
  world.forEach(shape => {    
    beginShape();
    shape.forEach(v => {
      vertex(v.x, v.y);
    });
    vertex(shape[0].x, shape[0].y);
    endShape();
  });
  pop();
}

function drawOtherPlayers() {
  noStroke();
  fill(0, 255, 0);

  push();
  translate(width/2-player.x, height/2-player.y);
  players.forEach(otherPlayer => {
    if (otherPlayer.id !== player.id) {      
      ellipse(otherPlayer.x, otherPlayer.y, 20);
    }
  });
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}