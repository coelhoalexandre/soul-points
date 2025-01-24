export default class Soul {
  constructor(soulType, { name, color, soulPoints, gameSize, souls, x, y }) {
    this.soulType = soulType;
    this.name = name;
    this.color = color;
    this.soulPoints = soulPoints;

    if (typeof x === "number" && typeof y === "number") {
      this.x = x;
      this.y = y;
    } else [this.x, this.y] = this.getRandomPosition(gameSize, souls);
  }

  getRandomPosition(gameSize, souls) {
    let [x, y] = [
      Math.floor(Math.random() * gameSize.width),
      Math.floor(Math.random() * gameSize.height),
    ];

    const isOccupiedPosition = !!souls.find(
      (soul) => soul.x === x && soul.y === y
    );

    if (isOccupiedPosition) [x, y] = this.getRandomPosition();

    return [x, y];
  }
}
