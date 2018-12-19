class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.dx = 0;
    this.dy = 0;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    ellipse(this.x, this.y, 20);
  }
}