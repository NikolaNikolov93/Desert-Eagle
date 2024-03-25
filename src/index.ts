// import { Application } from "pixi.js";
// import { Scene } from "./Scene"; // This is the import statement

// const app = new Application<HTMLCanvasElement>({
//   view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
//   resolution: window.devicePixelRatio || 1,
//   autoDensity: true,
//   backgroundColor: 0x6495ed,
//   width: 1025,
//   height: 600,
// });

// // pass in the screen size to avoid "asking up"
// const sceny: Scene = new Scene(app.screen.width, app.screen.height);

// app.stage.addChild(sceny);
import { App } from "./System/App";

const screenWidth: number = 1025;
const screenHeight: number = 600;

App.createApp(screenWidth, screenHeight);
App.addBackground(screenWidth, screenHeight);
App.addHero();
