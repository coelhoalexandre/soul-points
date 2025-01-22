import PureSoul from "../model/PureSoul.js";
import SoulController from "./SoulController.js";

export default class PureSoulController extends SoulController {
  constructor(pureSoulObj, gameSize, emitFunctions) {
    super("pureSoul");
    this.pureSoul = new PureSoul(pureSoulObj, gameSize, emitFunctions);
  }
}
