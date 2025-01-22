import Controller from "./Controller.js";

export default class SoulController extends Controller {
  constructor(name) {
    super(name);
  }

  insertGameContext({ ctx, gameSize }) {
    try {
      this[this.controllerName].ctx = ctx;
      this[this.controllerName].gameSize = gameSize;
    } catch (error) {
      console.error(error);
    }
  }

  getEssentialsProperty() {
    try {
      const essentialsProperty = {
        name: this[this.controllerName].name,
        x: this[this.controllerName].x,
        y: this[this.controllerName].y,
        width: this[this.controllerName].width,
        height: this[this.controllerName].height,
        soulPoints: this[this.controllerName].soulPoints,
        color: this[this.controllerName].color,
        isDestroyed: false,
      };
      return essentialsProperty;
    } catch (error) {
      console.error(error);
    }
  }
}
