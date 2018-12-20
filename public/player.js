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
    push();
    translate(width/2, height/2);
    fill(255);
    ellipse(0, 0, 20);
    pop();
  }
}