import { Application } from "pixi.js";
import { Background } from "../Game/Background";
import { Hero } from "../Game/Hero";

class PixiApp {
  app: Application;
  hero: Hero;
  constructor() {
    this.heroActions();
  }

  createApp(width: number, height: number) {
    this.app = new Application<HTMLCanvasElement>({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x6495ed,
      width: width,
      antialias: true,
      height: height,
    });
  }
  addHero(asstes: Promise<Record<string, any>>) {
    this.hero = new Hero();
    this.hero.addSprite(200, 200);
    this.hero.addTextures(asstes);
    this.app.stage.addChild(this.hero);
  }
  heroActions() {
    // Assuming 'hero' is an instance of the Hero class
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.hero.move("up");
          break;
        case "ArrowDown":
          this.hero.move("down");
          break;
        case "ArrowLeft":
          this.hero.move("left");
          break;
        case "ArrowRight":
          this.hero.move("right");
          break;
        case ` `:
          this.hero.dropBomb();
          break;
      }
    });
  }

  addBackground(width: number, height: number) {
    const background: Background = new Background(width, height);

    this.app.stage.addChild(background);
  }
}
export const App = new PixiApp();
