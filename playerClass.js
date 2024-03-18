let gameOver = false;
export { gameOver };
export default class Player {
  constructor(gameWidth, gameHeight) {
    this.spriteWidth = this.gameHeight = gameHeight;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 200;
    this.x = 0;
    this.y = this.gameHeight - this.height;
    this.image = playerImage;
    this.frameX = 8;
    this.frameY = 0;
    this.speed = 0;
    this.vy = 0;
    this.weight = 1;
    this.maxFrame = 8;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }

  draw(context) {
    context.strokeStyle = "white";

    context.strokeRect(this.x, this.y, this.width, this.height);

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(input, deltaTime, enemies) {
    /*collision detection*/
    enemies.forEach((enemy) => {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < enemy.width / 2 + this.width / 2) {
        gameOver = true;
      }
    });
    /*collision detection*/
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    //horizontal movement
    this.x += this.speed;
    if (input.keys.indexOf("ArrowRight") > -1) {
      this.speed = 5;
    } else if (input.keys.indexOf("ArrowLeft") > -1) {
      this.speed = -5;
    } else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
      this.vy -= 30;
    } else {
      this.speed = 0;
    }
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;
    //vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
      this.maxFrame = 5;
      this.frameY = 1;
    } else {
      this.vy = 0;
      this.maxFrame = 8;
      this.frameY = 0;
    }
    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
    if (this.y > this.gameHeight - this.height)
      this.y = this.y + this.gameHeight;
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
