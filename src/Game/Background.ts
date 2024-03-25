import { Container, Sprite, Ticker } from "pixi.js";

export class Background extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;
  private background: Sprite;

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.addSprite(this.screenHeight);

    Ticker.shared.add(this.update, this);
  }
  addSprite(height: number) {
    this.background = Sprite.from("background/bg.png");
    this.background.anchor.set(0, 0.5); // Set anchor to left
    this.background.position.set(0, height / 2);
    this.addChild(this.background);
  }
  private update(deltaTime: number): void {
    // Move the background from right to left
    this.background.x -= 3 * deltaTime; // Adjust the speed as needed

    // If the background moves completely off-screen, reposition it to the right
    if (this.background.x + this.background.width < 0) {
      this.background.x = this.screenWidth;
    }
  }
}
