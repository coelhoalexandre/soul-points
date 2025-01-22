export default class Controller {
  constructor(service, Model) {
    this.service = service;
    this.Model = Model;
  }

  async create(data) {
    try {
      const model = new this.Model(data);
      return this.service.create(model);
    } catch (error) {
      console.error(error);
    }
  }

  async getAll(scope) {
    try {
      return this.service.getAll(scope);
    } catch (error) {
      console.error(error);
    }
  }

  async getOne(scope) {
    try {
      return this.service.getOne(scope);
    } catch (error) {
      console.error(error);
    }
  }

  async updateOne(scope, dto) {
    try {
      return this.service.updateOne(scope, dto);
    } catch (error) {
      console.error(error);
    }
  }
}
