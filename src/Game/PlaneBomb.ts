// import { Container, Sprite, Ticker } from "pixi.js";

// export class Bomb extends Container {
//   private bomb: Sprite;
//   private startY: number;
//   private speed: number;

//   constructor(x: number, y: number) {
//     super();
//     this.createBomb(x, y);
//     this.startY = y;
//     this.speed = 4; // Adjust the speed as needed
//     this.startDropping();
//   }

//   private createBomb(x: number, y: number) {
//     this.bomb = Sprite.from("ammo/planeBomb.png");
//     this.bomb.anchor.set(1, 0.5);
//     this.bomb.position.set(x - 50, y + 70);
//     this.bomb.rotation = Math.PI / 2;
//     this.bomb.scale.set(0.6);
//     this.addChild(this.bomb);
//   }
//   private startDropping() {
//     Ticker.shared.add(this.updatePosition, this);
//   }
//   private updatePosition(delta: number) {
//     this.bomb.y += this.speed * delta;
//     this.bomb.x -= delta;

//     if (this.bomb.y >= this.startY + 800) {
//       this.destroy();
//     }
//   }
// }
