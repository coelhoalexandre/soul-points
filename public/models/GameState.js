export default class GameState {
  canvasElement;
  ctx;
  width;
  height;
  colors;
  players;
  pureSouls;
  realSize;
  pointsToChangeColor;
  initialSoulPoints;

  constructor() {}

  setSize({ width, height }) {
    this.width = width;
    this.height = height;
  }

  getSize() {
    return { width: this.width, height: this.height };
  }

  getSouls() {
    const players = this.players || [];
    const pureSouls = this.pureSouls || [];
    return [...players, ...pureSouls];
  }

  getPlayerColors() {
    return {
      options: this.colors.player,
      length: this.colors.playerLength,
    };
  }
}
