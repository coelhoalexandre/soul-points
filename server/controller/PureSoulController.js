import PureSoul from "../models/PureSoul.js";
import PureSoulService from "../services/PureSoulService.js";
import Controller from "./Controller.js";

const pureSoulService = new PureSoulService();

export default class PureSoulController extends Controller {
  constructor() {
    super(pureSoulService, PureSoul);
  }

  async getNotDestroyed() {
    return this.service.getAll({ isDestroyed: false });
  }
}
