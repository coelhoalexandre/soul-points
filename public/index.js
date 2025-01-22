import {
  cellSize,
  gameObj,
  playerObj,
  pointsToChangeColor,
  soulObj,
} from "./objects/game.js";
import GameController from "./controller/GameController.js";
import PlayerController from "./controller/PlayerController.js";
import PureSoulController from "./controller/PureSoulController.js";
import drawSoul from "./utils/drawSoul.js";
import Cookie from "./utils/Cookie.js";

const socket = io("/", {
  auth: {
    accessToken: Cookie.readCookie("access_token"),
  },
});

const gameContext = {};

const controllers = {};

const logoutButtons = document.querySelectorAll("#logout_button");

logoutButtons.forEach((logoutButton) => {
  logoutButton.addEventListener("click", () => {
    alert("Deslogado!");
    window.location.href = "/login";
    Cookie.deleteCookie("access_token");
  });
});

const emitUpdateSoul = {
  player: (name, dto, isDestroy = true) =>
    socket.emit("update_player", { name, dto, isDestroy }),
  pureSoul: (name, dto, isDestroy = true) =>
    socket.emit("update_pure_soul", { name, dto, isDestroy }),
};

const emitCheckCollision = (options, callback) =>
  socket.emit("check_collision", options, callback);

socket.on("authenticated_user", (username) => {
  socket.auth.username = username;
});

socket.on("connect_error", () => {
  alert("Usuário não autenticado!");
  window.location.href = "/login";
});

socket.on("user_already_authenticated", () => {
  alert("Usuário já está no jogo!");
  window.location.href = "/login";
});

socket.on("create_game", () => {
  controllers.game = new GameController(gameObj);
  const canvasElement = document.getElementById("game_canvas");

  controllers.game.draw({ canvasElement, cellSize });
  gameContext.ctx = controllers.game.ctx;
  gameContext.gameSize = controllers.game.game.getSize();

  const rankingSectionElement = document.getElementById("ranking_section");

  rankingSectionElement.classList.add(
    `w-[${gameObj.size.width * 0.75}px]`,
    `max-h-[${gameObj.size.height}px]`
  );

  return;
});

socket.on("generate_pure_soul", async (name, updatePureSoul) => {
  controllers.pureSoul = new PureSoulController(
    { name, ...soulObj },
    gameContext.gameSize,
    { updateSoul: emitUpdateSoul, checkCollision: emitCheckCollision }
  );

  controllers.pureSoul.insertGameContext(gameContext);

  updatePureSoul(controllers.pureSoul.getEssentialsProperty());

  return;
});

socket.on("generate_player", (name, isDefinedPlayer, player, createPlayer) => {
  const setPlayerController = () => {
    controllers.player = new PlayerController(
      { colorOptions: playerObj.colorOptions, ...player },
      controllers.game.game.getSize(),
      pointsToChangeColor,
      {
        updateSoul: emitUpdateSoul,
        checkCollision: emitCheckCollision,
      }
    );
  };

  if (isDefinedPlayer) setPlayerController();
  else {
    player = { name, ...playerObj };
    setPlayerController();
    createPlayer(controllers.player.getEssentialsProperty());
  }

  controllers.player.insertGameContext(gameContext);

  return;
});

socket.on("draw_souls", (players, pureSouls) => {
  if (!gameContext.ctx) throw new Error("Context not found!");

  players.forEach((soul) => drawSoul(gameContext.ctx, soul));
  pureSouls.forEach((soul) => drawSoul(gameContext.ctx, soul));

  return;
});

socket.on("draw_soul", (soul) => {
  if (!gameContext.ctx) throw new Error("Context not found!");

  drawSoul(gameContext.ctx, soul, soul.name === socket.auth.username);

  return;
});

socket.on("destroy_soul", ({ x, y, width, height }) => {
  if (!gameContext.ctx) throw new Error("Context not found!");
  console.log("destroy_soul: ", { x, y, width, height });
  gameContext.ctx.clearRect(x, y, width, height);

  return;
});

socket.on("update_position_element", ({ x, y }) => {
  const positionElement = document.getElementById("position");
  positionElement.innerHTML = `<span>X: <strong>${x}</strong></span> <span>Y: <strong>${y}</strong></span>`;
});

socket.on("update_ranking", (ranking) => {
  const rankingListElement = document.getElementById("ranking_list");

  rankingListElement.innerHTML = "";

  ranking.forEach(
    (player, index) =>
      (rankingListElement.innerHTML += `
        <li class="flex border-2 border-neutral-200 py-1">
          <span class="flex justify-center border-r-2 px-2 w-fit font-bold">
            ${index + 1}
          </span> 
          <span class="flex justify-center mr-2 border-r-2 px-2 w-fit font-bold">
            ${player.soulPoints}
          </span> 
          ${player.name}
        </li>
        `)
  );
});

socket.on("player_is_destroyed", (name) => {
  if (socket.auth.username === name)
    socket.emit("game_over", (player) => {
      controllers.player.disable();

      const modalBgElement = document.getElementById("modal_bg");
      const dialogElement = document.getElementById("game_over");
      const tryAgainButtonElement = document.getElementById("try_again");
      const soulPointsElement = document.getElementById("soul_points_span");

      modalBgElement.hidden = false;
      dialogElement.showModal();
      soulPointsElement.textContent = `${player.lastSoulPoints}`;

      const tryAgain = () => {
        dialogElement.close();
        modalBgElement.hidden = true;
        controllers.player.update(player);
        controllers.player.enable();
        socket.emit("regenerate_player");
        tryAgainButtonElement.removeEventListener("click", tryAgain);
      };

      tryAgainButtonElement.addEventListener("click", tryAgain);
    });
});
