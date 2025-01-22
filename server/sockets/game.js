import PlayerController from "../controller/PlayerController.js";
import PureSoulController from "../Controller/PureSoulController.js";
import drawInterface from "../events/drawInterface.js";
import updateSoulInterface from "../events/updateSoulInteface.js";
import io from "../index.js";
import authenticateUser from "../middleware/authenticateUser.js";

export const playerController = new PlayerController();
export const pureSoulController = new PureSoulController();

io.of("/").use(authenticateUser);

io.of("/").on("connection", async (socket) => {
  console.log(`User ${socket.username} is connected`);

  const isAlreadyAuthenticatedUser = !!(await playerController.getOne({
    name: socket.username,
    isOnline: true,
  }));

  if (isAlreadyAuthenticatedUser)
    return socket.emit("user_already_authenticated");

  drawInterface(io, socket);

  updateSoulInterface(io, socket);

  socket.on("check_collision", async ({ x, y }, callback) => {
    callback([
      ...(await playerController.getAll({
        x,
        y,
        isOnline: true,
        isDestroyed: false,
      })),
      ...(await pureSoulController.getAll({ x, y, isDestroyed: false })),
    ]);
  });

  socket.on("game_over", async (callback) =>
    callback(await playerController.getOne({ name: socket.username }))
  );

  socket.on("regenerate_player", async () =>
    io.emit("update_ranking", await playerController.getRankingAscendingOrder())
  );

  socket.on("disconnect", async () => {
    io.emit(
      "destroy_soul",
      await playerController.getOne({ name: socket.username })
    );
    await playerController.updateOne(
      { name: socket.username },
      { isOnline: false }
    );
    io.emit(
      "update_ranking",
      await playerController.getRankingAscendingOrder()
    );

    console.log(`User ${socket.username} is disconnected`);
  });
});
