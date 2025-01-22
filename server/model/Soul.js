export default class Soul {
  constructor({ name, x, y, width, height, soulPoints, color, isDestroyed }) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.soulPoints = soulPoints;
    this.color = color;
    this.isDestroyed = isDestroyed;
  }
}
