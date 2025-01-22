import { playerController, pureSoulController } from "../sockets/game.js";
import generatePureSoul from "./generatePureSoul.js";

const drawSouls = async (socket) =>
  socket.emit(
    "draw_souls",
    await playerController.getOnlinesNotDestroyed(),
    await pureSoulController.getAll()
  );

const drawInterface = async (io, socket) => {
  socket.emit("create_game");

  const pureSoul = await pureSoulController.getOne({ isDestroyed: false });

  if (!pureSoul) generatePureSoul(socket, "PureSoul");

  const player = await playerController.getOne({ name: socket.username });
  const isDefinedPlayer = !!player;

  const createPlayer = async (data) => {
    await playerController.create({ ...data, isOnline: true, x: 999, y: 999 });
    drawSouls(socket);
    io.emit(
      "update_ranking",
      await playerController.getRankingAscendingOrder()
    );
  };

  socket.emit(
    "generate_player",
    socket.username,
    isDefinedPlayer,
    player,
    createPlayer
  );

  if (isDefinedPlayer) {
    drawSouls(socket);
    io.emit(
      "draw_soul",
      await playerController.updateOne(
        { name: socket.username },
        {
          isOnline: true,
        }
      )
    );

    io.emit(
      "update_ranking",
      await playerController.getRankingAscendingOrder()
    );
  }
};

export default drawInterface;
