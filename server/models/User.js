import jwt from "jsonwebtoken";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const getHashedPassword = (password, salt) =>
  scryptSync(password, salt, 64).toString("hex");

export default class User {
  constructor({ name, password }) {
    this.name = name;
    [this.salt, this.hashedPassword] = this.createHash(password).split(":");
  }

  createHash(password) {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = getHashedPassword(password, salt);
    return `${salt}:${hashedPassword}`;
  }

  static validUpdateData(data) {
    const validProperties = ["name"];

    const validData = {};
    for (const property in data)
      if (validProperties.includes(property))
        validData[property] = data[property];

    return validData;
  }

  static isCorrectPassword(password, hashedPassword, salt) {
    const testHashedPassword = Buffer.from(
      getHashedPassword(password, salt),
      "hex"
    );
    const realHashedPassword = Buffer.from(hashedPassword, "hex");
    return timingSafeEqual(realHashedPassword, testHashedPassword);
  }

  static getToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    return token;
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
}
