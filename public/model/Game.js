export default class Game {
  canvas;
  ctx;

  constructor({ size: { width, height } }) {
    this.width = width;
    this.height = height;
  }

  getSize() {
    return { width: this.width, height: this.height };
  }

  create({ canvasElement, cellSize }) {
    this.canvas = canvasElement;

    if (!this.canvas.getContext) throw new Error("Sem canvas");

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext("2d");

    // this.ctx.strokeStyle = "rgb(229, 229, 229)";

    // this.ctx.fillRect(0, 0, this.height, this.width);

    // for (let x = 0.5; x < this.width; x += cellSize) {
    //   this.ctx.moveTo(x, 0);
    //   this.ctx.lineTo(x, this.height);
    // }
    // for (let y = 0.5; y < this.height; y += cellSize) {
    //   this.ctx.moveTo(0, y);
    //   this.ctx.lineTo(this.width, y);
    // }

    // this.ctx.stroke();
  }
}
