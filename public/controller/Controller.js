export default class Controller {
  constructor(controllerName) {
    this.controllerName = controllerName;
  }

  draw(options) {
    try {
      this[this.controllerName].create(options);
    } catch (error) {
      console.error(error);
    }
  }
}
