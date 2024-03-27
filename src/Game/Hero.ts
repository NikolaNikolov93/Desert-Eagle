import { Container, Sprite, Texture } from "pixi.js";
import { Bomb } from "./PlaneBomb";

export class Hero extends Container {
  private hero: Sprite;
  private assets: Record<string, any>;
  private textures: Texture[] = [];
  private currentFrameIndex: number = 0;
  private animationInterval: number = 100;
  private movementSpeed: number = 7;

  constructor() {
    super();
    this.startAnimation();
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
    const bomb = new Bomb(this.hero.x, this.hero.y);
    this.parent.addChild(bomb);
  }
}
