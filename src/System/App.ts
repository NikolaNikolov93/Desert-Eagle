import { Application } from "pixi.js";
import { Background } from "../Game/Background";
import { Hero } from "../Game/Hero";

class PixiApp {
  app: Application;
  hero: Hero;
  constructor() {}

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

  addBackground(width: number, height: number) {
    const background: Background = new Background(width, height);

    this.app.stage.addChild(background);
  }
}
export const App = new PixiApp();
