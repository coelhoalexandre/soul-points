import Soul from "./Soul.js";

export default class Player extends Soul {
  #colors;
  #pointsToChangeColor;
  constructor(data) {
    super("Player", data);
    this.isOnline = true;
    this.#colors = data.colors;
    this.#pointsToChangeColor = data.pointsToChangeColor;
    this.color = this.getColor(this.soulPoints);
  }

  static move({ direction, gameSize, player, souls }) {
    let currentPosition;
    let tempPosition = { x: player.x, y: player.y };

    const directions = {
      up: () => {
        if (player.y - 1 >= 0) tempPosition.y = player.y - 1;
      },
      left: () => {
        if (player.x - 1 >= 0) tempPosition.x = player.x - 1;
      },
      down: () => {
        if (player.y + 1 < gameSize.height) tempPosition.y = player.y + 1;
      },
      right: () => {
        if (player.x + 1 < gameSize.width) tempPosition.x = player.x + 1;
      },
    };

    directions[direction]();

    let collidedSoul;
    let isPositionAvailable = true;

    for (let i = 0; i < souls.length; i++) {
      if (tempPosition.x === souls[i].x && tempPosition.y === souls[i].y) {
        if (souls[i].name === "PureSoul") {
          collidedSoul = { category: "pureSouls", soul: souls[i] };
          break;
        }

        if (
          player.soulPoints < souls[i].soulPoints ||
          player.color == souls[i].color
        ) {
          isPositionAvailable = false;
          break;
        }
        collidedSoul = { category: "players", soul: souls[i] };
      }
    }

    if (isPositionAvailable) currentPosition = tempPosition;

    return {
      isMoved: isPositionAvailable,
      currentPosition,
      collidedSoul,
    };
  }

  getColor(soulPoints) {
    const index = Math.floor(soulPoints / this.#pointsToChangeColor);
    const colorOptionsMaxIndex = this.#colors.length - 1;
    const color =
      index < colorOptionsMaxIndex
        ? this.#colors.options[index][1]
        : this.#colors.options[colorOptionsMaxIndex][1];
    return color;
  }
}
