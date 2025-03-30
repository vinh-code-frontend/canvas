/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const context = canvas.getContext("2d");

class Circle {
  x = 0;
  y = 0;
  dx = 1;
  dy = 1;
  radius = 30;
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx ?? 1;
    this.dy = dy ?? 1;
    this.radius = radius ?? 30;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = "rgba(255,0,255,1)";

    context.fillStyle = "rgba(255, 0, 255, 0.3)";
    context.fill();
    context.stroke();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const { random } = Math;

const circles = Array.from({ length: 10 }, () => {
  const radius = 30;
  const x = random() * (innerWidth - radius * 2) + radius;
  const y = random() * (innerHeight - radius * 2) + radius;

  const dx = (random() - 0.5) * 2;
  const dy = (random() - 0.5) * 2;

  return new Circle(x, y, dx, dy, radius);
});

console.log(circles);

const animate = () => {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach((circle) => {
    circle.update();
  });
};

animate();
