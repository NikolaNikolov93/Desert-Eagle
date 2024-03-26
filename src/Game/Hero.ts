import { Container, Sprite, Texture } from "pixi.js";

export class Hero extends Container {
  private hero: Sprite;
  private assets: Promise<Record<string, any>>;
  private textures: Texture[] = [];
  private currentFrameIndex: number = 0;
  private animationInterval: number = 100;
  private movementSpeed: number = 7;
  private bomb: Sprite;

  constructor() {
    super();
    this.startAnimation();
  }
  addTextures(assets: Promise<Record<string, any>>) {
    this.assets = assets;
    this.assets.then((resolvedAssets) => {
      this.textures = Object.values(resolvedAssets);
    });
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
    // Implement bomb dropping logic here
    this.bomb = Sprite.from("ammo/planeBomb.png");
    this.bomb.anchor.set(1, 0.5);
    this.bomb.position.set(this.hero.x - 50, this.hero.y + 70);
    this.bomb.rotation = Math.PI / 2;
    this.bomb.scale.set(0.6);
    this.addChild(this.bomb);
  }
}
