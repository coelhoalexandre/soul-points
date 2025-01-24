import io from "../index.js";
import colors from "../GameController/assets/colors.js";
import PlayerController from "../controller/PlayerController.js";
import PureSoulController from "../Controller/PureSoulController.js";
import authenticateUser from "../middleware/authenticateUser.js";
import GameController from "../GameController/index.js";
import dbGameFunction from "../db/dbGameFunction.js";

const gameController = new GameController();
const playerController = new PlayerController();
const pureSoulController = new PureSoulController();

playerController.updateAll({}, { isOnline: false });

gameController.setInitialState({
  gameSize: { width: 20, height: 20 },
  realSize: { width: 400, height: 400 },
  colors,
  players: [],
  pureSouls: await pureSoulController.getAll(),
});

for (const listenerName in gameController.listenersNames)
  gameController.addEventListener(
    gameController.listenersNames[listenerName],
    (command) => io.emit(command.type, command)
  );

gameController.addEventListener(
  gameController.listenersNames.UPDATE_STATE,
  dbGameFunction
);

io.of("/").use(authenticateUser);

io.of("/").on("connection", async (socket) => {
  console.log(`User ${socket.username} is connected`);

  const isOnlinePlayer = gameController.isOnlinePlayer(socket.username);

  if (isOnlinePlayer) return socket.emit("user_already_authenticated");

  if (!gameController.isPlayerLimit) return socket.emit("player_limit");

  socket.emit("create_game", gameController.getState());

  const player = gameController.createPlayer(
    socket.username,
    await playerController.getOne({ name: socket.username })
  );

  gameController.addPlayer(player);

  socket.emit("init_game");

  socket.on("keydown", (command) => {
    gameController.keyInput(command.code, command.name);
  });

  socket.on("regenerate_player", (name) => {
    gameController.regeneratePlayer(name);
  });

  socket.on("disconnect", async () => {
    gameController.disconnectPlayer(socket.username);

    console.log(`User ${socket.username} is disconnected`);
  });
});
