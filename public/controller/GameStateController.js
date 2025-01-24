import GameState from "../models/GameState.js";

export default class GameStateController {
  #gameState = new GameState();

  constructor() {}

  setInitialState(gameState) {
    try {
      this.#gameState.pointsToChangeColor = 1;
      this.#gameState.initialSoulPoints = 0;
      this.#gameState.setSize(gameState.gameSize);
      this.#gameState.realSize = gameState.realSize;
      this.#gameState.colors = gameState.colors;
      this.#gameState.players = gameState.players;
      this.#gameState.pureSouls = gameState.pureSouls;
    } catch (error) {
      console.error(error);
    }
  }

  getState() {
    try {
      return {
        gameSize: this.#gameState.getSize(),
        realSize: this.#gameState.realSize,
        colors: this.#gameState.colors,
        players: this.#gameState.players,
        pureSouls: this.#gameState.pureSouls,
      };
    } catch (error) {
      console.error(error);
    }
  }

  updateState(dto) {
    Object.assign(this.#gameState, dto);
  }

  drawCanvas(canvasElement) {
    try {
      if (!canvasElement) throw new Error("Canvas Element not Found!");
      this.#gameState.canvasElement = canvasElement;

      canvasElement.width = this.#gameState.width;
      canvasElement.height = this.#gameState.height;

      canvasElement.classList.add(
        `w-[${this.#gameState.realSize.width}px]`,
        `h-[${this.#gameState.realSize.height}px]`
      );

      this.#gameState.ctx = canvasElement.getContext("2d");
    } catch (error) {
      console.error(error);
    }
  }

  drawSouls(currentName, requestAnimationFrame) {
    try {
      this.#gameState.ctx.clearRect(
        0,
        0,
        this.#gameState.width,
        this.#gameState.height
      );

      const draw = (soul) => {
        this.#gameState.ctx.fillStyle = soul.color;
        this.#gameState.ctx.fillRect(soul.x, soul.y, 1, 1);
      };

      this.#gameState.ctx.globalAlpha = 0.8;
      this.#gameState.players.forEach((soul) => draw(soul));

      this.#gameState.ctx.globalAlpha = 1;
      this.#gameState.pureSouls.forEach((soul) => draw(soul));

      const currentPlayer = this.#gameState.players.find(
        (player) => player.name === currentName
      );

      if (currentPlayer) draw(currentPlayer);

      requestAnimationFrame(() =>
        this.drawSouls(currentName, requestAnimationFrame)
      );
    } catch (error) {
      console.error(error);
    }
  }
}
