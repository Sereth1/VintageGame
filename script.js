/** @type {HTMLCanvasElement} */
import InputHandler from "./inputHandler.js";
import Player from "./playerClass.js";
import Background from "./background.js";
import Enemy from "./enemy.js";
import { score } from "./enemy.js";
import { gameOver } from "./playerClass.js";
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 720;

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);
const background = new Background(canvas.width, canvas.height);
const enemy = new Enemy(canvas.width, canvas.height);

let enemies = [];

function handleEnemies(deltaTime) {
  if (enemyTimer > enemyInterval + randomEnemyInterval) {
    enemies.push(new Enemy(canvas.width, canvas.height));
    enemyTimer = 0;
  } else {
    enemyTimer += deltaTime;
  }
  enemies.forEach((enemy) => {
    enemy.draw(ctx);
    enemy.update(deltaTime);
  });
  enemies = enemies.filter((enemy) => !enemy.markForDeletion);
}
console.log(score);
let lastTime = null;
let enemyTimer = 0;
let enemyInterval = 1000;
let randomEnemyInterval = Math.random() * 1000 + 500;

function displayStatusText(context) {
  context.fillStyle = "black";
  context.font = "40px sans-serif";
  context.fillText(`Score :${score}`, 95, 100, 120);
  context.fillStyle = "white";
  context.font = "40px sans-serif";
  context.fillText(`Score :${score}`, 100, 100, 120);

  if (gameOver) {
    context.fillStyle = "black";
    context.font = "100px sans-serif";
    context.fillText("YOU LOST ", 180, 300, 1000);
    context.fillStyle = "white";
    context.font = "100px sans-serif";
    context.fillText("YOU LOST ", 175, 300, 1000);
  }
}

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw(ctx);
  background.update();
  player.draw(ctx);
  player.update(input, deltaTime, enemies);
  handleEnemies(deltaTime);
  displayStatusText(ctx);
  !gameOver && requestAnimationFrame(animate);
}
animate(0);
