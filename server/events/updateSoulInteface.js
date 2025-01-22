import { playerController, pureSoulController } from "../sockets/game.js";
import generatePureSoul from "./generatePureSoul.js";

const updateSoulInterface = (io, socket) => {
  const updateSoul = async (controller, name, dto, isDestroy) => {
    if (isDestroy) io.emit("destroy_soul", await controller.getOne({ name }));
    let soulUpdated = await controller.updateOne({ name }, dto);
    if (!dto?.isDestroyed) io.emit("draw_soul", soulUpdated);
  };

  socket.on("update_player", async ({ name, dto, isDestroy }) => {
    updateSoul(playerController, name, dto, isDestroy);

    if (dto?.isDestroyed) io.emit("player_is_destroyed", name);
    if (socket.username === name) socket.emit("update_position_element", dto);
    if (typeof dto?.soulPoints === "number")
      io.emit(
        "update_ranking",
        await playerController.getRankingAscendingOrder()
      );
  });

  socket.on("update_pure_soul", async ({ name, dto, isDestroy }) => {
    if (dto?.isDestroyed) {
      await pureSoulController.updateOne({ name }, dto);
      generatePureSoul(socket, name);
      return;
    }

    updateSoul(pureSoulController, name, dto, isDestroy);
  });
};

export default updateSoulInterface;
