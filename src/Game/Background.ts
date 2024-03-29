import { Container, Sprite, Text, Ticker } from "pixi.js";

export class Background extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;
  private background: Sprite;
  private backgrounds: Sprite[] = [];
  private distance: number = 0;
  private distanceText: Text;
  private score: number = 0;
  private scoreText: Text;
  private scoreKey: string = "gameScore";

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    Ticker.shared.add(this.getScore, this);

    for (let i = 0; i < 3; i++) {
      this.addSprite(i * this.screenWidth);
      this.startScrolling();
    }
    this.distanceText = new Text(`Distance: ${this.distance}`, {
      fill: 0x000000,
    });
    this.distanceText.position.set(30, 30);

    this.addChild(this.distanceText);
    this.scoreText = new Text(`Score: ${this.score}`, {
      fill: 0x000000,
    });
    this.scoreText.position.set(250, 30);

    this.addChild(this.scoreText);
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
        background.x += this.screenWidth * 3;
        this.distance += 100; // Example increment, you can update the distance based on your game logic
        this.distanceText.text = `Distance: ${this.distance}`;
      }
    }
  }

  getScore() {
    this.score = parseInt(localStorage.getItem(this.scoreKey) || "0");
    this.scoreText.text = `Score ${this.score}`;
  }
}
