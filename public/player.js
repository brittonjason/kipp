class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.dx = 0;
    this.dy = 0;
  }

  update() {
    if (document.hasFocus()) {
      this.x += this.dx;
      this.y += this.dy;
    }
    else {
      this.dx = 0;
      this.dy = 0;
    }
  }

  draw() {
    ellipse(this.x, this.y, 20);
  }
}