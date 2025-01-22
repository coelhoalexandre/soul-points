import db from "../db/dbConnect.js";

export default class Service {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async create(model) {
    this.collection.insertOne(model);
    return model;
  }

  async getAll(scope) {
    return this.collection.find(scope).toArray();
  }

  async getAllAsc(property, scope) {
    return this.collection
      .find(scope)
      .sort({ [property]: 1 })
      .toArray();
  }

  async getOne(scope) {
    return this.collection.findOne(scope);
  }

  async updateOne(scope, dto) {
    return this.collection.findOneAndUpdate(
      scope,
      { $set: dto },
      {
        returnDocument: "after",
        returnNewDocument: true,
      }
    );
  }
}
