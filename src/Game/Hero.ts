import { Container, Sprite } from "pixi.js";

export class Hero extends Container {
  private hero: Sprite;
  constructor(height: number) {
    super();
    this.height = height;
  }
  addSprite(x: number, y: number) {
    this.hero = Sprite.from("hero/planeRed1.png");
    this.hero.anchor.set(1, 0.5); // Set anchor to center
    this.hero.position.set(x, y); // Set position relative to hero's height
    this.addChild(this.hero); // Add the sprite to the hero container
  }
}
