import { getRandomNumber } from "../utils/getRandomNumber.js";

export default class Soul {
  ctx;
  x;
  y;
  constructor(
    soulType,
    { name, width, height, color, soulPoints, ...obj },
    gameSize,
    { updateSoul, checkCollision }
  ) {
    this.soulType = soulType;
    this.name = name;
    this.width = width;
    this.height = height;
    this.color = color;
    this.soulPoints = soulPoints;
    this.gameSize = gameSize;
    this.emitUpdateSoul = updateSoul;
    this.emitCheckCollision = checkCollision;

    if (obj?.x && obj?.y) {
      this.x = obj.x;
      this.y = obj.y;
    } else setTimeout(this.randomPosition(), 1000);
  }

  randomPosition() {
    let randomPosition = this.#getRandomPosition();

    this.emitCheckCollision(randomPosition, (souls) => {
      if (souls.length) this.randomPosition();

      if (!souls.length) {
        this.x = randomPosition.x;
        this.y = randomPosition.y;

        const params = {
          name: this.name,
          dto: { x: this.x, y: this.y, isDestroyed: false },
        };

        if (this.soulType == "PureSoul")
          this.emitUpdateSoul.pureSoul(params.name, params.dto, false);

        if (this.soulType === "Player")
          this.emitUpdateSoul.player(params.name, params.dto, false);
      }
    });

    return { x: this.x, y: this.y };
  }

  #getRandomPosition() {
    const x = getRandomNumber(0, this.gameSize.width / this.width) * this.width;
    const y =
      getRandomNumber(0, this.gameSize.height / this.height) * this.height;

    return { x, y };
  }
}
