/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
canvas.width = innerWidth;

canvas.height = innerHeight;

const context = canvas.getContext("2d");
console.dir({ canvas, context });

context.fillStyle = "rgba(255,0,0,0.5)";
context.fillRect(100, 100, 100, 100);

context.fillStyle = "rgba(0,255,0,0.5)";
context.fillRect(400, 100, 100, 100);

context.fillStyle = "rgba(0,0,255,0.5)";
context.fillRect(300, 300, 100, 100);

//* Line
context.beginPath();
context.moveTo(50, 300);
context.lineTo(300, 100);
context.lineTo(400, 300);
context.lineTo(50, 300);
context.strokeStyle = "rgba(255,0,255,0.5)";
context.stroke();

// Arc / circle
context.beginPath();
context.arc(300, 300, 30, 0, Math.PI * 2, false);
context.strokeStyle = "rgba(255,255,0,1)";
context.stroke();

for (let i = 0; i < 10; i++) {
  context.beginPath();
  context.arc(600, (i + 1) * 2 * 30, 30, 0, Math.PI * 2, false);
  context.strokeStyle = "black";
  context.stroke();
}

for (let i = 0; i < 5; i++) {
  context.beginPath();
  const x = Math.random() * innerWidth;
  const y = Math.random() * innerHeight;
  context.arc(x, y, 30, 0, Math.PI * 2, false);
  context.strokeStyle = "blue";
  context.stroke();
}
