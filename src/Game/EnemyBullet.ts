import { Container, Rectangle, Sprite, Ticker } from "pixi.js";

export class EnemyBullet extends Container {
  private bullet: Sprite;
  private startX: number;
  private startY: number;
  private speed: number;
  private bulletHitbox: Rectangle; // Custom hitbox for collision detection

  constructor(x: number, y: number) {
    super();
    this.startX = x;
    this.startY = y;
    this.speed = 4; // Adjust the speed as needed
    this.createBullet(this.startX, this.startY);
    this.startShooting();
  }
  getBulletHitbox() {
    return this.bulletHitbox;
  }
  createBullet(x: number, y: number) {
    this.bullet = Sprite.from("ammo/tankBullet.png");
    this.bullet.anchor.set(1, 0.5);
    this.bullet.position.set(x, y);
    this.bullet.rotation = -90;
    this.bulletHitbox = new Rectangle(0, 0, 50, 32); // Customize hitbox size as needed

    this.addChild(this.bullet);
  }

  startShooting() {
    Ticker.shared.add(this.updatePosition, this);
  }

  updatePosition(delta: number) {
    this.bullet.y -= this.speed * delta;
    this.bullet.x -= this.speed * 2;
    this.bulletHitbox.x = this.bullet.x;
    this.bulletHitbox.y = this.bullet.y;

    if (this.bullet.y >= this.startY + 800) {
      this.destroy();
    }
  }
}
