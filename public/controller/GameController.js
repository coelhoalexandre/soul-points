import Game from "../model/Game.js";
import Controller from "./Controller.js";

export default class GameController extends Controller {
  constructor(gameObj) {
    super("game");
    this.game = new Game(gameObj);
  }

  get ctx() {
    return this.game.ctx;
  }

  createGame({ ctx, size }, canvasElement) {
    this.game.ctx = ctx;
    this.game.height = size.height;
    this.game.width = size.width;
    this.game.canvas = canvasElement;
  }
}
