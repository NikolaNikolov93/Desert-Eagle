import { Container, Rectangle, Sprite, Texture, Ticker } from "pixi.js";
import { App } from "../System/App";
import { Terrain } from "./Terrain";
import { EnemyBullet } from "./EnemyBullet";
import { EndGameScene } from "..";

export class Hero extends Container {
  private hero: Sprite;
  private bomb: Sprite;
  private bombSpeed: number;
  private assets: Record<string, any>;
  private textures: Texture[] = [];
  private currentFrameIndex: number = 0;
  private animationInterval: number = 100;
  private movementSpeed: number = 7;

  private bobmHitbox: Rectangle; // Custom hitbox for collision detection

  constructor() {
    super();
    this.startAnimation();
    this.bombSpeed = 4;
    this.bobmHitbox = new Rectangle(0, 0, 45, 35); // Customize hitbox size as needed
    Ticker.shared.add(this.checkForTerrainHit, this);
    Ticker.shared.add(this.checkForBulletHit, this);
    Ticker.shared.add(this.updateBombPosition, this);
  }
  getBombHitbox() {
    return this.bobmHitbox;
  }
  addTextures(assets: Record<string, any>) {
    this.assets = assets;
    this.textures = Object.values(this.assets);
  }

  addSprite(x: number, y: number) {
    this.hero = Sprite.from("hero/planeRed1.png");
    this.hero.anchor.set(1, 0.5);
    this.hero.position.set(x, y);
    this.addChild(this.hero);
  }
  startAnimation() {
    setInterval(() => {
      this.currentFrameIndex =
        (this.currentFrameIndex + 1) % this.textures.length;
      this.hero.texture = this.textures[this.currentFrameIndex];
    }, this.animationInterval);
  }
  move(direction: "up" | "down" | "left" | "right") {
    switch (direction) {
      case "up":
        this.hero.y -= this.movementSpeed;
        break;
      case "down":
        this.hero.y += this.movementSpeed;
        break;
      case "left":
        this.hero.x -= this.movementSpeed;
        break;
      case "right":
        this.hero.x += this.movementSpeed;
        break;
    }
  }
  dropBomb() {
    // const bomb = new Bomb(this.hero.x, this.hero.y);
    // this.parent.addChild(bomb);
    if (this.bomb) {
      this.removeChild(this.bomb);
    }
    this.bomb = Sprite.from("ammo/planeBomb.png");
    this.bomb.anchor.set(1, 0.5);
    this.bomb.position.set(this.hero.x - 50, this.hero.y + 70);
    this.bomb.rotation = Math.PI / 2;
    this.bomb.scale.set(0.6);
    this.addChild(this.bomb);
  }

  updateBombPosition(delta: number) {
    if (this.bomb) {
      this.bomb.y += this.bombSpeed * delta;
      this.bomb.x -= delta;
      this.bobmHitbox.x = this.bomb.x;
      this.bobmHitbox.y = this.bomb.y;
      if (this.bomb.y >= this.hero.y + 600) {
        this.removeChild(this.bomb);
        return;
      }
    } else {
      return;
    }
  }
  checkForTerrainHit() {
    const app = App.app;
    const stageChildren = app.stage.children;
    stageChildren.forEach((child) => {
      if (child instanceof Terrain) {
        const enemyBulletHitbox = child.getBounds();
        const heroHitbox = this.hero.getBounds();

        if (
          enemyBulletHitbox.x + enemyBulletHitbox.width / 2 > heroHitbox.x &&
          enemyBulletHitbox.x < heroHitbox.x + heroHitbox.width / 2 &&
          enemyBulletHitbox.y + enemyBulletHitbox.height > heroHitbox.y &&
          enemyBulletHitbox.y < heroHitbox.y + heroHitbox.height
        ) {
          this.endGame();
        }
      }
    });
  }
  endGame() {
    const endGame = new EndGameScene();
    endGame.displayEndGameScreen();
    endGame.destroyApp();
  }
  checkForBulletHit() {
    const app = App.app;
    const stageChildren = app.stage.children;
    stageChildren.forEach((child) => {
      if (child instanceof EnemyBullet) {
        const enemyBulletHitbox = child.getBulletHitbox();
        const heroHitbox = this.hero.getBounds();
        console.log(child.getBounds().x);
        console.log(heroHitbox.x);

        if (
          enemyBulletHitbox.x + enemyBulletHitbox.width / 2 > heroHitbox.x &&
          enemyBulletHitbox.x < heroHitbox.x + heroHitbox.width / 2 &&
          enemyBulletHitbox.y + enemyBulletHitbox.height > heroHitbox.y &&
          enemyBulletHitbox.y < heroHitbox.y + heroHitbox.height
        ) {
          this.endGame();
        }
      }
    });
  }

  // checkForBombHit() {
  //   if (this.bomb) {
  //     const app = App.app;
  //     const stageChildren = app.stage.children;

  //     stageChildren.forEach((child) => {
  //       if (child instanceof Enemy) {
  //         const heroHitbox = child.getHitbox();
  //         const bombBounds = this.bomb.getBounds();
  //         if (
  //           heroHitbox.x + heroHitbox.width > bombBounds.x &&
  //           heroHitbox.x < bombBounds.x + bombBounds.width &&
  //           heroHitbox.y + heroHitbox.height > bombBounds.y &&
  //           heroHitbox.y < bombBounds.y + bombBounds.height
  //         ) {
  //           console.log("enemyDown");
  //         }
  //       }
  //     });
  //   }
  // }

  // enemyDestroy() {
  //   console.log("enemy hit");
  // }
}
