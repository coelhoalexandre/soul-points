import Soul from "./Soul.js";

export default class PureSoul extends Soul {
  constructor(data) {
    super(data);
  }

  static validUpdateData(data) {
    const validProperties = ["name", "soulPoints", "color"];

    const validData = {};
    for (const property in data)
      if (validProperties.includes(property))
        validData[property] = data[property];

    return validData;
  }
}
