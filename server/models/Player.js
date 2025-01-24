import Soul from "./Soul.js";

export default class Player extends Soul {
  constructor(data) {
    super(data);
    this.isOnline = data.isOnline;
  }

  static validUpdateData(data) {
    const validProperties = ["name", "soulPoints", "color", "isOnline"];

    const validData = {};
    for (const property in data)
      if (validProperties.includes(property))
        validData[property] = data[property];

    return validData;
  }
}
