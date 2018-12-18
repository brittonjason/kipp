let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://localhost:3000');
}

function draw() {
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}