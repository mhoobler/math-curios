const canvas = document.getElementById("canvas");
const width = (canvas.width = Math.floor(window.innerWidth));
const height = (canvas.height = Math.floor(window.innerHeight));
const ctx = canvas.getContext("2d");
ctx.imageSmoothinEnabled = false;
ctx.mozImageSmoothinEnabled = false;
ctx.oImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

var RENDER = false;

var inputCoords = [];
var distances = [];

//Change this to find only the pixels WITHIN the distance so we only update those pixels

function getDistance() {
  RENDER = false;
  distances = [];
  for (let sy = 0; sy < height; sy++) {
    for (let sx = 0; sx < width; sx++) {
      let d = [];
      for (let i = 0; i < inputCoords.length; i++) {
        const { x, y } = inputCoords[i];
        d.push((Math.abs(x - sx) ^ 2) + (Math.abs(y - sy) ^ 2));
      }
      distances.push(Math.min(...d));
    }
  }
  RENDER = false;
}
