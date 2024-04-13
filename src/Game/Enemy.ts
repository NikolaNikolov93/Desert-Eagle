import { Container, Rectangle, Sprite, Texture, Ticker } from "pixi.js";
import { EnemyBullet } from "./EnemyBullet";
import { App } from "../System/App";
import { Hero } from "./Hero";

export class Enemy extends Container {
  private enemy: Sprite;
  private speed: number;
  private enemyHitbox: Rectangle; // Custom hitbox for collision detection
  private score: number;
  private explosionTextures: Texture[];

  constructor() {
    super();
    this.speed = 5; // Adjust the speed as needed
    this.explosionTextures = [
      Texture.from("explosion/ex1.png"),
      Texture.from("explosion/ex2.png"),
      Texture.from("explosion/ex3.png"),
      Texture.from("explosion/ex4.png"),
    ];
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

  checkForEnemyHit() {
    const app = App.app;
    const stageChildren = app.stage.children;
    stageChildren.forEach((child) => {
      if (child instanceof Hero) {
        const bombHitbox = child.getBombHitbox();
        const enemyHitbox = this.enemy.getBounds();
        if (
          bombHitbox.x + bombHitbox.width > enemyHitbox.x &&
          bombHitbox.x < enemyHitbox.x + enemyHitbox.width - 15 &&
          bombHitbox.y + bombHitbox.height - 45 > enemyHitbox.y &&
          bombHitbox.y < enemyHitbox.y + enemyHitbox.height / 5
        ) {
          this.enemyDestroy();
          child.removeBomb();
        }
      }
    });
  }
  enemyDestroy() {
    //Add explosion
    const explosion = new Sprite(this.explosionTextures[0]);
    explosion.anchor.set(0.5);
    explosion.position.set(this.enemy.x, this.enemy.y);
    this.addChild(explosion);
    //Explosion animation effect
    let frameIndex = 0;
    const explosionInterval = setInterval(() => {
      frameIndex++;
      if (frameIndex < this.explosionTextures.length) {
        explosion.texture = this.explosionTextures[frameIndex];
      } else {
        clearInterval(explosionInterval);
        this.removeChild(explosion);
      }
    }, 100);
    this.score = parseInt(localStorage.getItem("gameScore") || "0");
    this.score += 10;
    Ticker.shared.remove(this.checkForEnemyHit, this);
    localStorage.setItem("gameScore", this.score.toString());
    this.removeChild(this.enemy);
  }
}
