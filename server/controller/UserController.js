import User from "../model/User.js";
import UserService from "../services/UserService.js";
import Controller from "./Controller.js";

const userServices = new UserService();

export default class UserController extends Controller {
  constructor() {
    super(userServices, User);
  }

  async isUsernameAlreadyExist(name) {
    return !!this.service.getOne({ name });
  }
}
