import { Container, Sprite, Ticker } from "pixi.js";

export class Enemy extends Container {
  private enemy: Sprite;
  private speed: number;
  private bullet: Sprite;

  constructor() {
    super();
    this.speed = 5; // Adjust the speed as needed
    Ticker.shared.add(this.update, this);
    Ticker.shared.add(this.bulletUpdate, this);
  }

  addSprite(x: number, y: number) {
    this.enemy = Sprite.from(`enemy/enemy.png`);
    this.enemy.anchor.set(0.5);
    this.enemy.position.set(x, y);
    this.enemy.scale.x = -1;
    this.addChild(this.enemy);
  }

  update() {
    // Move the enemy horizontally
    this.enemy.x -= this.speed;

    // Check if the enemy has moved outside the left edge of the screen
    if (this.enemy.x + this.enemy.width / 2 < 0) {
      this.removeChild(this.enemy);
      Ticker.shared.remove(this.update, this);
    }
  }
  shoot() {
    this.bullet = Sprite.from("ammo/tankBullet.png");
    this.bullet.anchor.set(0.5);
    this.bullet.position.set(this.enemy.x - 100, this.enemy.y - 60);
    this.bullet.scale.x = -1;
    this.bullet.rotation = 45; // Rotate the bullet 180 degrees
    this.addChild(this.bullet);
  }
  bulletUpdate() {
    // Move the enemy horizontally
    this.bullet.x -= this.speed + 2;
    this.bullet.y -= this.speed - 2;

    // Check if the enemy has moved outside the left edge of the screen
    if (this.bullet.x < -1000 || this.bullet.y < -1000) {
      this.removeChild(this.enemy);
      Ticker.shared.remove(this.update, this);
      Ticker.shared.remove(this.bulletUpdate, this);
    }
  }
}
