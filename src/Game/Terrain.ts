import { Container, Sprite, Ticker } from "pixi.js";
import getRandomNumber from "../utils/getRandomNum";

export class Terrain extends Container {
  private terrain: Sprite;
  private speed: number;

  constructor() {
    super();
    this.speed = 5; // Adjust the speed as needed
    this.addTerrain();
    Ticker.shared.add(this.update, this);
  }

  addTerrain() {
    // Replace "terrain.png" with the path to your terrain texture
    this.terrain = Sprite.from("terrain/rockDown.png");
    const scale: number = getRandomNumber(0.8, 1.5);
    // Adjust the position and scale of the terrain sprite as needed
    this.terrain.position.set(1000, 0); // Example position
    this.terrain.scale.set(scale);
    this.addChild(this.terrain);
  }
  update() {
    // Move the terrain horizontally
    this.terrain.x -= this.speed;

    // Check if the terrain has moved outside the left edge of the screen
    if (this.terrain.x + this.terrain.width / 2 < 0) {
      this.removeChild(this.terrain);
      Ticker.shared.remove(this.update, this);
    }
  }
}
