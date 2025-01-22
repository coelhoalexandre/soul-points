import Player from "../model/Player.js";
import SoulController from "./SoulController.js";

export default class PlayerController extends SoulController {
  constructor(playerObj, gameSize, pointsToChangeColor, emitFunctions) {
    super("player");
    this.player = new Player(
      playerObj,
      gameSize,
      pointsToChangeColor,
      emitFunctions
    );
  }

  enable() {
    this.player.enable();
  }

  disable() {
    this.player.disable();
  }

  update({ color, soulPoints }) {
    this.player.color = color;
    this.player.soulPoints = soulPoints;

    const position = this.player.randomPosition();
    this.player.x = position.x;
    this.player.y = position.y;
  }
}
