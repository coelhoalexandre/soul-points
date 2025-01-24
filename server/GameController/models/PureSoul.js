import Soul from "./Soul.js";

export default class PureSoul extends Soul {
  constructor(data) {
    super("PureSoul", { ...data, soulPoints: 1 });
  }
}
