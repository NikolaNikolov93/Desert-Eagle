import { Container, Sprite, Texture } from "pixi.js";

export class Hero extends Container {
  private hero: Sprite;
  private assets: Promise<Record<string, any>>;
  private textures: Texture[] = [];
  private currentFrameIndex: number = 0;
  private animationInterval: number = 100; // Adjust as needed for animation speed

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
}
