import Player from "../models/Player.js";
import PlayerService from "../services/PlayerService.js";
import Controller from "./Controller.js";

const playerServices = new PlayerService();

export default class PlayerController extends Controller {
  constructor() {
    super(playerServices, Player);
  }

  async getOnlines() {
    return this.service.getAll({ isOnline: true });
  }

  async getOfflines() {
    return this.service.getAll({ isOnline: false });
  }
}
