import { Assets } from "pixi.js";
import { App } from "./System/App";

const screenWidth: number = 1024;
const screenHeight: number = 600;
const assets: Promise<Record<string, any>> = Assets.load([
  "/hero/planeRed1.png",
  "/hero/planeRed2.png",
  "/hero/planeRed3.png",
]);

App.createApp(screenWidth, screenHeight);
App.addBackground(screenWidth, screenHeight);
assets.then((resolvedAssets) => {
  App.addHero(resolvedAssets);
});
App.startEnemySpawning();
App.startTerrainSpawning();
