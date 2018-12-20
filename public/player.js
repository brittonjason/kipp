class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.dx = 0;
    this.dy = 0;
  }

  update() {
    if (document.hasFocus()) {
      this.x += this.dx;
      this.y += this.dy;
      const overlapV = this.isColliding();
      overlapV.forEach(v => {
        if (v.x !== 0) {
          this.x += v.x;
        }
        if (v.y !== 0) {
          this.y += v.y;
        } 
      });          
    }
    else {
      this.dx = 0;
      this.dy = 0;
    }
  }

  draw() {
    noStroke();
    fill(255);

    push();
    translate(width/2, height/2);    
    ellipse(0, 0, 20);
    pop();
  }

  isColliding() {
    const overlapV = [];

    if (!world) {
      return overlapV;
    }
    
    const playerBounds = new SAT.Circle(new SAT.Vector(this.x, this.y), 10);
    world.forEach(shape => {
      const position = shape[0];
      const vertices = [];
      shape.forEach(v => {
        vertices.push(new SAT.Vector(v.x - position.x, v.y - position.y));
      });
      const polygon = new SAT.Polygon(position, vertices);
      const response = new SAT.Response();
      if (SAT.testPolygonCircle(polygon, playerBounds, response)) {
        overlapV.push(response.overlapV);
      }
    });

    return overlapV;
  }
}