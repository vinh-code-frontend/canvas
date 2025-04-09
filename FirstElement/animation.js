/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const context = canvas.getContext("2d");

const mouse = {
  x: undefined,
  y: undefined,
};

const colorArray = ["#fed1d7", "#fed28b", "#92e6ce", "#83dce2", "#ff63b4"];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("mouseout", (e) => {
  if (!e.relatedTarget && !e.toElement) {
    mouse.x = undefined;
    mouse.y = undefined;
  }
});

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Circle {
  x = 0;
  y = 0;
  dx = 1;
  dy = 1;
  radius = 2;
  minRadius = 2;

  maxRadius = 60;

  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx ?? 1;
    this.dy = dy ?? 1;
    this.radius = radius ?? 2;
    this.minRadius = radius ?? 2;
    this.color = colorArray[Math.floor(random() * colorArray.length)];
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    context.fillStyle = this.color;
    context.fill();
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

    if (
      mouse.x - this.x < this.maxRadius &&
      mouse.x - this.x > -this.maxRadius &&
      mouse.y - this.y < this.maxRadius &&
      mouse.y - this.y > -this.maxRadius
    ) {
      if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  }
}

const { random } = Math;

const circles = Array.from({ length: 600 }, () => {
  const radius = random() * 3 + 1;
  const x = random() * (innerWidth - radius * 2) + radius;
  const y = random() * (innerHeight - radius * 2) + radius;

  const dx = random() - 0.5;
  const dy = random() - 0.5;

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
