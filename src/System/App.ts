import { Application } from "pixi.js";
import { Background } from "../Game/Background";

class PixiApp {
  app: Application;
  constructor() {}

  createApp(width: number, height: number) {
    this.app = new Application<HTMLCanvasElement>({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x6495ed,
      width: width,
      height: height,
    });
  }

  addBackground(width: number, height: number) {
    const background: Background = new Background(width, height);

    this.app.stage.addChild(background);
  }
}
export const App = new PixiApp();
