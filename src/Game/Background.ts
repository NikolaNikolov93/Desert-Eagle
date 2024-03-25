import { Container, Sprite, Ticker } from "pixi.js";

export class Background extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;
  private background: Sprite;
  private backgrounds: Sprite[] = [];

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    for (let i = 0; i < 3; i++) {
      this.addSprite(i * this.screenWidth);
      this.startScrolling();
    }
  }
  addSprite(width: number) {
    this.background = Sprite.from("background/bg.png");
    this.background.anchor.set(1, 0.5);
    this.background.position.set(width, this.screenHeight / 2);
    this.addChild(this.background);
    this.backgrounds.push(this.background);
  }
  public startScrolling(): void {
    Ticker.shared.add(this.update, this);
  }

  public stopScrolling(): void {
    Ticker.shared.remove(this.update, this);
  }

  private update(deltaTime: number): void {
    for (const background of this.backgrounds) {
      background.x -= 1.5 * deltaTime; // Adjust the speed as needed
      // If the background moves completely off-screen, reposition it to the right
      if (background.x + background.width < 0) {
        background.x += this.screenWidth * 3; // Reposition to the right
      }
    }
  }
}
