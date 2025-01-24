export default class EventListener {
  #listeners;
  constructor(listeners) {
    this.#listeners = listeners;
  }

  addEventListener(name, callback) {
    if (typeof callback !== "function")
      throw new Error("Callback must be a function!");
    const listeners = this.#listeners[name] || [];
    this.#listeners[name] = [...listeners, callback];
  }

  iterateEventListeners(name, command) {
    const listener = this.#listeners[name];
    if (listener) listener.forEach((callback) => callback(command));
  }

  removeEventListener(name, callback) {
    const listener = this.#listeners[name];

    if (listener)
      listener.filter((listenerCallback) => listenerCallback !== callback);
  }

  removeAllEventListener(name) {
    const listener = this.#listeners[name];

    if (listener) delete this.#listeners[name];
  }
}
