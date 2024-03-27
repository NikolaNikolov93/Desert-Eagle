import { Assets } from "pixi.js";
import { App } from "./System/App";

const screenWidth: number = 1024;
const screenHeight: number = 600;
const assets: Promise<Record<string, any>> = Assets.load([
  "/hero/planeRed1.png",
  "/hero/planeRed2.png",
  "/hero/planeRed3.png",
]);

// Create start game scene
class StartGameScene {
  private container: HTMLElement | null;
  private playButton: HTMLElement | null;

  constructor() {
    this.container = document.getElementById("start-game-scene");
    this.playButton = document.getElementById("play-game-button");
    if (this.playButton) {
      this.playButton.addEventListener("click", this.startGame.bind(this));
    }
  }

  startGame() {
    // Hide start game scene
    if (this.container) {
      this.container.style.display = "none";
    }

    // Start the main game
    startMainGame();
  }
}

// Function to start the main game
function startMainGame() {
  App.createApp(screenWidth, screenHeight);
  App.addBackground(screenWidth, screenHeight);
  assets.then((resolvedAssets) => {
    App.addHero(resolvedAssets);
  });
  App.startEnemySpawning();
  App.startTerrainSpawning();
}

// Create start game scene
new StartGameScene();
