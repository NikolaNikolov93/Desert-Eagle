import { Assets, Container, Text } from "pixi.js";
import { App } from "./System/App";

const screenWidth: number = 1024;
const screenHeight: number = 600;
const assets: Promise<Record<string, any>> = Assets.load([
  "/hero/planeRed1.png",
  "/hero/planeRed2.png",
  "/hero/planeRed3.png",
]);

// Create start game scene
export class StartGameScene {
  private startGameendGameContainer: HTMLElement | null;
  private playButton: HTMLElement | null;

  constructor() {
    this.startGameendGameContainer =
      document.getElementById("start-game-scene");
    this.playButton = document.getElementById("play-game-button");
    if (this.playButton) {
      this.playButton.addEventListener("click", this.startGame.bind(this));
    }
  }

  startGame() {
    // Hide start game scene
    if (this.startGameendGameContainer) {
      this.startGameendGameContainer.style.display = "none";
    }

    // Start the main game
    startMainGame();
  }
}
export class EndGameScene extends Container {
  private endGameContainer: HTMLElement;
  private playAgainButton: HTMLElement;
  private pixiApp: HTMLElement;
  private scoreText: Text;
  private scoreKey: string = "gameScore";
  private score: number;

  constructor() {
    super();
    // Initialize elements
    this.endGameContainer = document.getElementById("end-game-container")!;
    this.pixiApp = document.getElementById("pixi-content")!;
    this.playAgainButton = document.getElementById("play-again-button")!;
    this.scoreText = new Text(`Score: ${this.score}`, {
      fill: 0xffffff,
    });
    this.scoreText.position.set(250, 50);
    this.addChild(this.scoreText);
    this.addScore();

    // Add event listener to play again button
    if (this.playAgainButton) {
      this.playAgainButton.addEventListener("click", this.playAgain.bind(this));
    }
  }
  addScore() {
    this.score = parseInt(localStorage.getItem(this.scoreKey) || "0");
    this.scoreText.text = `Score ${this.score}`;
  }
  destroyApp() {
    App.removeApp();
  }
  playAgain() {
    // Hide end game scene
    if (this.endGameContainer) {
      this.endGameContainer.style.display = "none";
      this.pixiApp.style.display = "block";
    }

    // Start a new game
    window.location.reload();
  }

  displayEndGameScreen() {
    // Show end game scene
    if (this.endGameContainer) {
      this.endGameContainer.style.display = "block";
      this.pixiApp.style.display = "none";
    }
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
