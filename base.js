import Boid from "./boid.js";
import Vector from "./vector.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const screenHeight = canvas.height;
const screenWidth = canvas.width;
const numBoids = 100;

let flock = [];

for (let i = 0; i < numBoids; i++) {
  flock.push(
    new Boid(Math.random() * screenWidth, Math.random() * screenHeight)
  );
}

const myDiv = document.createElement("div");
myDiv.classList.add(`wrapper`);

document.body.appendChild(myDiv);

const myList = document.createElement("ul");
document.querySelector("div").appendChild(myList);

/* for (let boid of flock) {
  let listItem = document.createElement("li");
  listItem.id = `boid-${flock.indexOf(boid)}`;
  myList.appendChild(listItem);
  listItem.innerHTML = `
    ${boid.position.x} : ${boid.position.y} --
    ${boid.velocity.x} : ${boid.velocity.y}
    `;
} */

function mainLoop() {
  ctx.clearRect(0, 0, screenWidth, screenHeight);
  for (let boid of flock) {
/*     let boidListItem = document.getElementById(`boid-${flock.indexOf(boid)}`);
    boidListItem.innerHTML = `
      ${formatNum(boid.position.x)} : ${formatNum(boid.position.y)} --
      ${boid.velocity.x} : ${boid.velocity.y}
      `; */

    boid.steer(flock);
    boid.update();
    boid.draw(ctx);
  }
  requestAnimationFrame(mainLoop);
}

mainLoop();