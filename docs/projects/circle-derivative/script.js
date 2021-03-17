const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const c = document.getElementById("canvas");

// The WIDTH * (0.6) needs to match the values in styles
// Should probably just make this a background image
const width = (c.width = Math.floor(WIDTH * 0.6));
const height = (c.height = Math.floor(HEIGHT * 0.9));

// Helper functions for drawing on canvas
const fw = (x) => Math.floor(width / x);
const fh = (x) => Math.floor(height / x);
const getMargin = (x) => {
  let y = width > height ? height : width;

  return y - Math.floor(y / x);
};

var inputs = {
  offset: 10000,
  radius: 10000,
};

const distanceResult = document.getElementById("distance-result");
const slopeResult = document.getElementById("slope-result");
distanceResult.innerText = 0;
slopeResult.innerText = 1 / 0;

const center = { x: fw(2), y: fh(2) };
const PI = Math.PI;
const S = Math.sqrt;

const draw = () => {
  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, width, height);

  // draw center circle
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.arc(center.x, center.y, S(inputs.radius), 0, PI * 2);
  ctx.stroke();

  let c2 = center.x - S(inputs.offset + inputs.radius);
  // draw 2nd circle
  ctx.beginPath();
  ctx.strokeStyle = "#13A400";
  ctx.arc(c2, center.y, S(inputs.offset), 0, PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(c2, center.y, 3, 0, PI * 2);
  ctx.fill();

  //draw slope
  let slope = S(inputs.offset) / S(inputs.radius);
  ctx.beginPath();
  ctx.strokeStyle = "#0044CC";
  ctx.moveTo(c2 - 1000 * slope, center.y + 1000);
  ctx.lineTo(c2 + 1000 * slope, center.y - 1000);
  ctx.stroke();

  //draw distance
  ctx.beginPath();
  ctx.strokeStyle = "#FF0404";
  ctx.moveTo(c2, center.y);
  ctx.lineTo(center.x - S(inputs.radius), center.y);
  ctx.stroke();

  slopeResult.innerText = S(inputs.radius) / S(inputs.offset);
  distanceResult.innerText = center.x - c2 - S(inputs.radius);
};

draw();

const handleChange = (evt) => {
  let name = evt.currentTarget.name;
  let value = parseInt(evt.currentTarget.value);
  console.log({ name, value });

  document.getElementById(`${name}-value`).innerText = value;

  inputs = { ...inputs, [name]: value };
  draw();
  console.log(inputs);
};

document.getElementById("offset-control").oninput = handleChange;
document.getElementById("radius-control").oninput = handleChange;

/*
  radius
  offset

  circle1 = x^2 + y^2 = radius
  circle2 = (x + sqrt(offset + radius) )^2 + y^2 = offset

  slope = sqrt(offset)/sqrt(radius)
  line = slope*y - sqrt(offset + radius)
*/
