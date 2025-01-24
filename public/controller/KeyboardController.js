import EventListener from "../models/EventListener.js";

export default class KeyboardController {
  #listeners = {};
  #eventListener;
  constructor() {
    this.keydownHandler = this.keydown.bind(this);
    this.#eventListener = new EventListener(this.#listeners);
  }

  addEventListener(name, callback) {
    try {
      this.#eventListener.addEventListener(name, callback);
    } catch (error) {
      console.error(error);
    }
  }

  enableKeydown() {
    document.addEventListener("keydown", this.keydownHandler);
  }

  disableKeydown() {
    document.addEventListener("keydown", this.keydownHandler);
  }

  keydown(event) {
    this.#eventListener.iterateEventListeners("keydown", event.code);
  }
}
