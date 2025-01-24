import GameStateController from "./controller/GameStateController.js";
import KeyboardController from "./controller/KeyboardController.js";
import Cookie from "./models/Cookie.js";

const socket = io("/", {
  auth: {
    accessToken: Cookie.readCookie("access_token"),
  },
});

const logoutButtons = document.querySelectorAll("#logout_button");

logoutButtons.forEach((logoutButton) => {
  logoutButton.addEventListener("click", () => {
    alert("Deslogado!");
    window.location.href = "/login";
    Cookie.deleteCookie("access_token");
  });
});

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

socket.on("player_limit", () => {
  alert("Limite de Jogadores alcançado!");
  window.location.href = "/login";
});

const gameStateController = new GameStateController();
const keyboardController = new KeyboardController();

const isCurrentPlayer = (name) => name === socket.auth.username;

socket.on("create_game", (gameState) => {
  const canvasElement = document.getElementById("game_canvas");
  const rankingSectionElement = document.getElementById("ranking_section");

  gameStateController.setInitialState(gameState);
  gameStateController.drawCanvas(canvasElement);
  gameStateController.drawSouls(socket.auth.username, requestAnimationFrame);

  rankingSectionElement.classList.add(
    `w-[${gameState.realSize.width * 0.75}px]`,
    `max-h-[${gameState.realSize.height}px]`
  );

  return;
});

socket.on("init_game", () => {
  keyboardController.enableKeydown();
  keyboardController.addEventListener("keydown", (code) =>
    socket.emit("keydown", {
      type: "keydown",
      code,
      name: socket.auth.username,
    })
  );
});

socket.on("update_state", ({ dto }) => {
  gameStateController.updateState(dto);
});

socket.on("update_position_element", ({ player }) => {
  if (isCurrentPlayer(player.name)) {
    const positionElement = document.getElementById("position");
    positionElement.innerHTML = `<span>X: <strong>${player.x}</strong></span> <span>Y: <strong>${player.y}</strong></span>`;
  }
});

socket.on("update_ranking", ({ ranking }) => {
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

socket.on("game_over", (command) => {
  if (isCurrentPlayer(command.name)) {
    keyboardController.disableKeydown();

    const modalBgElement = document.getElementById("modal_bg");
    const dialogElement = document.getElementById("game_over");
    const tryAgainButtonElement = document.getElementById("try_again");
    const soulPointsElement = document.getElementById("soul_points_span");

    modalBgElement.hidden = false;
    dialogElement.showModal();
    soulPointsElement.textContent = `${command.soulPoints}`;

    const tryAgain = () => {
      dialogElement.close();
      modalBgElement.hidden = true;
      socket.emit("regenerate_player", socket.auth.username);
      keyboardController.enableKeydown();
      tryAgainButtonElement.removeEventListener("click", tryAgain);
    };

    tryAgainButtonElement.addEventListener("click", tryAgain);
  }
});

socket.on("regenerate_soul", (command) => {
  gameStateController.regenerateSoul(command.soul.data, command.soul.category);
});
