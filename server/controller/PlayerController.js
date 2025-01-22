import Player from "../model/Player.js";
import PlayerService from "../services/PlayerService.js";
import Controller from "./Controller.js";

const playerServices = new PlayerService();

export default class PlayerController extends Controller {
  constructor() {
    super(playerServices, Player);
  }

  async getOnlinesNotDestroyed() {
    return this.service.getAll({ isOnline: true, isDestroyed: false });
  }

  async getOfflines() {
    return this.service.getAll({ isOnline: false });
  }

  async getRankingAscendingOrder() {
    return this.service.getAllAsc("soulPoints", { isOnline: true });
  }
}
