let score = 0;
export { score };

export default class Enemy {
  constructor(gameWidth, gameHeight) {
    this.spriteWidth = this.gameHeight = gameHeight;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 160;
    this.height = 119;
    this.x = this.gameWidth;
    this.y = gameHeight - this.height;
    this.frameX = 0;
    this.image = enemyImage;
    this.speed = Math.random() * 8 + 6;
    this.frameX = 0;
    this.maxFrame = 5;
    this.markForDeletion = false;
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
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    this.x -= this.speed;
    if (this.x < 0 - this.width) {
      this.markForDeletion = true;
      score++;
    }
  }
}
