import { Container, Rectangle, Sprite, Ticker } from "pixi.js";
import { EnemyBullet } from "./EnemyBullet";
import { App } from "../System/App";
import { Hero } from "./Hero";

export class Enemy extends Container {
  private enemy: Sprite;
  private speed: number;
  private enemyHitbox: Rectangle; // Custom hitbox for collision detection
  private score: number;

  constructor() {
    super();
    this.speed = 5; // Adjust the speed as needed
    Ticker.shared.add(this.update, this);
    Ticker.shared.add(this.checkForEnemyHit, this);
  }
  getHitbox() {
    return this.enemyHitbox;
  }

  addSprite(x: number, y: number) {
    this.enemy = Sprite.from(`enemy/enemy.png`);
    this.enemy.anchor.set(0.5);
    this.enemy.position.set(x, y);
    this.enemyHitbox = new Rectangle(x, y, 171, 136); // Customize hitbox size as needed

    this.enemy.scale.x = -1;
    this.addChild(this.enemy);
  }

  update() {
    // Move the enemy horizontally
    this.enemy.x -= this.speed;
    this.enemyHitbox.x = this.enemy.x;
    this.enemyHitbox.y = this.enemy.y;

    // Check if the enemy has moved outside the left edge of the screen
    if (this.enemy.x + this.enemy.width / 2 < 0) {
      this.removeChild(this.enemy);
      Ticker.shared.remove(this.update, this);
    }
  }
  shoot() {
    const bullet = new EnemyBullet(this.enemy.x, this.enemy.y);

    this.addChild(bullet);
  }
  // bulletUpdate() {
  //   // Move the enemy horizontally
  //   this.bullet.x -= this.speed + 2;
  //   this.bullet.y -= this.speed - 2;

  //   // Check if the enemy has moved outside the left edge of the screen
  //   if (this.bullet.x < -1000 || this.bullet.y < -1000) {
  //     this.removeChild(this.enemy);
  //     this.removeChild(this.bullet);
  //     Ticker.shared.remove(this.update, this);
  //     Ticker.shared.remove(this.bulletUpdate, this);
  //   }
  // }

  checkForEnemyHit() {
    const app = App.app;
    const stageChildren = app.stage.children;
    stageChildren.forEach((child) => {
      if (child instanceof Hero) {
        const bombHitbox = child.getBombHitbox();
        const enemyHitbox = this.enemy.getBounds();
        if (
          bombHitbox.x + bombHitbox.width / 2 > enemyHitbox.x &&
          bombHitbox.x < enemyHitbox.x + enemyHitbox.width / 2 &&
          bombHitbox.y + bombHitbox.height / 2 > enemyHitbox.y &&
          bombHitbox.y < enemyHitbox.y + enemyHitbox.height / 2
        ) {
          this.enemyDestroy();
        }
      }
    });
  }
  enemyDestroy() {
    this.score = parseInt(localStorage.getItem("gameScore") || "0");
    this.score += 10;
    Ticker.shared.remove(this.checkForEnemyHit, this);
    localStorage.setItem("gameScore", this.score.toString());
    console.log("ENEMY HIT WITH BOMB");
    this.removeChild(this.enemy);
  }
}
