import PlayerController from "../controller/PlayerController.js";
import PureSoulController from "../Controller/PureSoulController.js";

const playerController = new PlayerController();
const pureSoulController = new PureSoulController();

const dbActions = {
  create: async (controller, { datas }) =>
    datas.forEach(async (data) => {
      const isCreatedSoul = !!(await controller.getOne({ name: data.name }));
      if (!isCreatedSoul) controller.create(data);
    }),

  update: async (controller, { scope, dto }) =>
    await controller.updateOne(scope, dto),
  delete: async (controller, { scope }) => await controller.deleteOne(scope),

  disconnect: async (controller, { scope }) =>
    await controller.updateOne(scope, { isOnline: false }),
};

const dbActionFunction = (action, controller) => {
  const dbAction = dbActions[action.name];

  if (dbAction) dbAction(controller, action);
};

const gameControllerFieldsFunctions = {
  players: (action) => dbActionFunction(action, playerController),
  pureSouls: (action) => dbActionFunction(action, pureSoulController),
};

const dbGameFunction = (command) => {
  for (const field in command.dto) {
    const fieldFunction = gameControllerFieldsFunctions[field];

    if (fieldFunction) fieldFunction(command.action);
  }
};

export default dbGameFunction;
