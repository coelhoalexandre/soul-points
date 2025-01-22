import Soul from "./Soul.js";

export default class Player extends Soul {
  lastSoulPoints;
  constructor(playerObj) {
    super(playerObj);
    this.isOnline = playerObj.isOnline;
  }
}
