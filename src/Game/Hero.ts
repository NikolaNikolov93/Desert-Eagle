import { Container, Rectangle, Sprite, Texture, Ticker } from "pixi.js";
import { App } from "../System/App";
import { Terrain } from "./Terrain";
import { EndGameScene } from "..";

export class Hero extends Container {
  private hero: Sprite;
  private bomb: Sprite;
  private smoke: Sprite;
  private bombSpeed: number;
  private assets: Record<string, any>;
  private textures: Texture[] = [];
  private currentFrameIndex: number = 0;
  private animationInterval: number = 80;
  private movementSpeed: number = 4;

  private bobmHitbox: Rectangle; // Custom hitbox for collision detection
  private heroHitbox: Rectangle; // Custom hitbox for collision detection

  constructor() {
    super();
    this.startAnimation();
    this.bombSpeed = 4;
    this.bobmHitbox = new Rectangle(0, 0, 45, 35); // Customize hitbox size as needed
    this.heroHitbox = new Rectangle(0, 0, 88, 73); // Customize hitbox size as needed
    Ticker.shared.add(this.checkForTerrainHit, this);
    Ticker.shared.add(this.updateBombPosition, this);
    Ticker.shared.add(this.updateSmoke, this);
  }
  getBombHitbox() {
    return this.bobmHitbox;
  }
  getHeroHitbox() {
    return this.heroHitbox;
  }
  addSmoke(x: number, y: number) {
    this.smoke = Sprite.from("hero/puffSmall.png");
    this.smoke.anchor.set(1, 0.5);
    this.smoke.position.set(x, y);
    this.addChild(this.smoke);
  }
  updateSmoke() {
    let heroPosition = this.getHeroPosition();
    this.smoke.x = heroPosition.heroX - 75;
    this.smoke.y = heroPosition.heroY + 10;
    if (Ticker.shared.lastTime % 250 < 150) {
      // Change 500 and 250 for blinking frequency
      this.smoke.visible = true;
    } else {
      this.smoke.visible = false;
    }
  }
  getHeroPosition() {
    return { heroX: this.hero.x, heroY: this.hero.y };
  }
  addTextures(assets: Record<string, any>) {
    this.assets = assets;
    this.textures = Object.values(this.assets);
  }

  addSprite(x: number, y: number) {
    this.hero = Sprite.from("hero/planeRed1.png");
    this.hero.anchor.set(1, 0.5);
    this.hero.position.set(x, y);
    this.addSmoke(x, y);
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
        this.heroHitbox.y = this.hero.y;

        break;
      case "down":
        this.hero.y += this.movementSpeed;
        this.heroHitbox.y = this.hero.y;

        break;
      case "left":
        this.hero.x -= this.movementSpeed;
        this.heroHitbox.x = this.hero.x;

        break;
      case "right":
        this.hero.x += this.movementSpeed;
        this.heroHitbox.x = this.hero.x;

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
  removeBomb = () => {
    this.removeChild(this.bomb);
  };

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
        const terrainHitbox = child.getBounds();
        const heroHitbox = this.hero.getBounds();

        if (
          terrainHitbox.x + terrainHitbox.width / 2 > heroHitbox.x &&
          terrainHitbox.x < heroHitbox.x + heroHitbox.width / 2 &&
          terrainHitbox.y + terrainHitbox.height > heroHitbox.y &&
          terrainHitbox.y < heroHitbox.y + heroHitbox.height
        ) {
          this.endGame();
        }
      }
    });
  }
  endGame() {
    const endGame = new EndGameScene();
    endGame.destroyApp();
    endGame.displayEndGameScreen();
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
