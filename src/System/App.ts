import { Application, Ticker } from "pixi.js";
import { Background } from "../Game/Background";
import { Hero } from "../Game/Hero";
import { Enemy } from "../Game/Enemy";
import getRandomNumber from "../utils/getRandomNum";
import { Terrain } from "../Game/Terrain";
interface MyObject {
  [key: string]: boolean;
}

class PixiApp {
  app: Application;
  hero: Hero;
  enemy: Enemy;
  spawnInterval: number; // Interval between enemy spawns
  spawnTimer: number; // Timer to track elapsed time for spawning
  keys: MyObject;
  constructor() {
    // this.heroActions();
    this.spawnInterval;
    this.spawnTimer = 0;
    this.keys = {};
    document.addEventListener("keydown", this.keysDown);
    document.addEventListener("keyup", this.keysUp);
    Ticker.shared.add(this.movementLoop);
  }

  keysDown = (e: KeyboardEvent) => {
    this.keys[e.key] = true;
    console.log(this.keys[e.key]);
    console.log(e.key);
  };
  keysUp = (e: KeyboardEvent) => {
    this.keys[e.key] = false;
    console.log(this.keys[e.key]);
  };
  movementLoop = () => {
    if (this.keys["ArrowUp"]) {
      this.hero.move("up");
    }
    if (this.keys["ArrowDown"]) {
      this.hero.move("down");
    }
    if (this.keys["ArrowLeft"]) {
      this.hero.move("left");
    }
    if (this.keys["ArrowRight"]) {
      this.hero.move("right");
    }
  };

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
    localStorage.setItem("gameScore", "0");
  }
  removeApp() {
    this.app.stop();
    this.app.stage.removeChildren();
  }
  addHero(asstes: Record<string, any>) {
    this.hero = new Hero();
    this.hero.addSprite(200, 200);
    this.hero.addTextures(asstes);
    this.app.stage.addChild(this.hero);
  }
  // heroActions() {
  //   document.addEventListener("keydown", (event) => {
  //     switch (event.key) {
  //       case "ArrowUp":
  //         this.hero.move("up");
  //         break;
  //       case "ArrowDown":
  //         this.hero.move("down");
  //         break;
  //       case "ArrowLeft":
  //         this.hero.move("left");
  //         break;
  //       case "ArrowRight":
  //         this.hero.move("right");
  //         break;
  //       case ` `:
  //         this.hero.dropBomb();
  //         break;
  //     }
  //   });
  // }
  addEnemy() {
    this.enemy = new Enemy();
    this.enemy.addSprite(2000, 1050);
    this.enemy.scale.set(0.5);
    this.app.stage.addChild(this.enemy);
    this.enemy.shoot();
    // this.enemy.bulletUpdate();
    this.enemy.update();
  }
  startEnemySpawning() {
    Ticker.shared.add((delta) => {
      this.spawnInterval = getRandomNumber(300, 500); // generate different spawn interval for each enemy
      this.spawnTimer += delta;

      if (this.spawnTimer >= this.spawnInterval) {
        this.addEnemy();
        this.spawnTimer = 0;
      }
    });
  }

  addBackground(width: number, height: number) {
    const background: Background = new Background(width, height);

    this.app.stage.addChild(background);
  }
  addTerrain() {
    const terrain = new Terrain();
    this.app.stage.addChild(terrain);
  }
  startTerrainSpawning() {
    Ticker.shared.add((delta) => {
      this.spawnInterval = getRandomNumber(300, 500); // generate different spawn interval for each enemy
      this.spawnTimer += delta;

      if (this.spawnTimer >= this.spawnInterval) {
        this.addTerrain();
        this.spawnTimer = 0;
      }
    });
  }
}
export const App = new PixiApp();
