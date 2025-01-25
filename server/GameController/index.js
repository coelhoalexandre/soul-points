import EventListener from "./models/EventListener.js";
import Game from "./models/Game.js";
import Player from "./models/Player.js";
import PureSoul from "./models/PureSoul.js";

export default class GameController {
  #listeners = {};

  #game = new Game();
  #eventListener = new EventListener(this.#listeners);

  #methods = {
    KeyW: (name) => this.movePlayer(name, "up"),
    KeyA: (name) => this.movePlayer(name, "left"),
    KeyS: (name) => this.movePlayer(name, "down"),
    KeyD: (name) => this.movePlayer(name, "right"),
    ArrowUp: (name) => this.movePlayer(name, "up"),
    ArrowLeft: (name) => this.movePlayer(name, "left"),
    ArrowDown: (name) => this.movePlayer(name, "down"),
    ArrowRight: (name) => this.movePlayer(name, "right"),
  };

  #listenersNames = {
    UPDATE_STATE: "update_state",
    UPDATE_POSITION_ELEMENT: "update_position_element",
    UPDATE_RANKING: "update_ranking",
    GAME_OVER: "game_over",
  };

  constructor() {}

  get listenersNames() {
    return this.#listenersNames;
  }

  addEventListener(name, callback) {
    try {
      this.#eventListener.addEventListener(name, callback);
    } catch (error) {
      console.error(error);
    }
  }

  setInitialState(gameState) {
    try {
      this.#game.pointsToChangeColor = 1;
      this.#game.initialSoulPoints = 0;
      this.#game.setSize(gameState.gameSize);
      this.#game.realSize = gameState.realSize;
      this.#game.colors = gameState.colors;
      this.#game.players = gameState.players.map((player) =>
        this.createPlayer(player.name, player)
      );

      if (!gameState.pureSouls.length)
        gameState.pureSouls = [this.createPureSoul()];
      else
        gameState.pureSouls = gameState.pureSouls.map((pureSoul) =>
          this.createPureSoul(pureSoul)
        );

      this.#game.pureSouls = gameState.pureSouls;
    } catch (error) {
      console.error(error);
    }
  }

  getState() {
    try {
      return {
        gameSize: this.#game.getSize(),
        realSize: this.#game.realSize,
        colors: this.#game.colors,
        players: this.#game.players,
        pureSouls: this.#game.pureSouls,
      };
    } catch (error) {
      console.error(error);
    }
  }

  updateRanking() {
    const ranking = this.#game.players.sort(
      (a, b) => b.soulPoints - a.soulPoints
    );
    this.#iterateEventListeners(this.#listenersNames.UPDATE_RANKING, {
      ranking,
    });
  }

  isOnlinePlayer(name) {
    return !!this.#game.players.find((player) => player.name === name);
  }

  isPlayerLimit() {
    const area = this.#game.width * this.#game.height;
    return this.#game.players.length > area * 0.5;
  }

  createPlayer(name, dto) {
    dto = dto || {};
    try {
      return new Player({
        ...{
          name,
          soulPoints: this.#game.initialSoulPoints,
          pointsToChangeColor: this.#game.pointsToChangeColor,
          color: this.#game.colors.player[0],
          colors: this.#game.getPlayerColors(),
          gameSize: this.#game.getSize(),
          souls: this.#game.getSouls(),
          x: null,
          y: null,
        },
        ...dto,
      });
    } catch (error) {
      console.error(error);
    }
  }

  createPureSoul(dto) {
    dto = dto || {};
    try {
      return new PureSoul({
        ...{
          name: "PureSoul",
          color: this.#game.colors.pureSoul[1],
          gameSize: this.#game.getSize(),
          souls: this.#game.getSouls(),
        },
        ...dto,
      });
    } catch (error) {
      console.error(error);
    }
  }

  addPlayer(player) {
    try {
      this.#game.players.push(player);

      this.#iterateEventListeners(this.#listenersNames.UPDATE_STATE, {
        dto: {
          players: this.#game.players,
        },
        action: { name: "create", datas: [player] },
      });

      this.#iterateEventListeners(
        this.#listenersNames.UPDATE_POSITION_ELEMENT,
        {
          player,
        }
      );

      this.updateRanking();
    } catch (error) {
      console.error(error);
    }
  }

  addPureSouls(...pureSouls) {
    try {
      this.#game.pureSouls.push(...pureSouls);

      this.#iterateEventListeners(this.#listenersNames.UPDATE_STATE, {
        dto: {
          pureSouls: this.#game.pureSouls,
        },
        action: { name: "create", datas: [...pureSouls] },
      });
    } catch (error) {
      console.error(error);
    }
  }

  regeneratePlayer(name) {
    try {
      const player = this.createPlayer(name);
      this.addPlayer(player);
    } catch (error) {
      console.error(error);
    }
  }

  regeneratePureSoul() {
    try {
      const pureSoul = this.createPureSoul();
      this.addPureSouls(pureSoul);
    } catch (error) {
      console.error(error);
    }
  }

  keyInput(code, name) {
    try {
      const method = this.#methods[code];
      if (method) method(name);
    } catch (error) {
      console.error(error);
    }
  }

  movePlayer(name, direction) {
    try {
      const playerIndex = this.#game.players.findIndex(
        (player) => player.name === name
      );
      const player = this.#game.players[playerIndex];
      const souls = this.#game.getSouls();

      const { isMoved, currentPosition, collidedSoul } = Player.move({
        direction,
        gameSize: this.#game.getSize(),
        player,
        souls,
      });

      let isUpdatedPlayer = false;
      if (isMoved && currentPosition) {
        this.#game.players[playerIndex].x = currentPosition.x;
        this.#game.players[playerIndex].y = currentPosition.y;
        isUpdatedPlayer = true;

        this.#iterateEventListeners(
          this.#listenersNames.UPDATE_POSITION_ELEMENT,
          { player: this.#game.players[playerIndex] }
        );
      }

      if (collidedSoul) {
        const soulPoints =
          this.#game.players[playerIndex].soulPoints +
          collidedSoul.soul.soulPoints;

        const playerUpdated = this.createPlayer(name, {
          ...this.#game.players[playerIndex],
          soulPoints,
        });

        Object.assign(this.#game.players[playerIndex], playerUpdated);

        this.updateRanking();

        isUpdatedPlayer = true;

        this.destroySoul(collidedSoul.soul.name, collidedSoul.category);
      }

      if (isUpdatedPlayer)
        this.#iterateEventListeners(this.#listenersNames.UPDATE_STATE, {
          dto: {
            players: this.#game.players,
          },
          action: {
            name: "update",
            scope: { name },
            dto: this.#game.players[playerIndex],
          },
        });
    } catch (error) {
      console.error(error);
    }
  }

  destroySoul(name, category) {
    try {
      const { soulPoints } = this.#deleteSoul(name, category);

      const categoryFunctions = {
        pureSouls: () => this.regeneratePureSoul(),
        players: () =>
          this.#iterateEventListeners(this.#listenersNames.GAME_OVER, {
            name,
            soulPoints,
          }),
      };

      const categoryFunction = categoryFunctions[category];

      if (categoryFunction) categoryFunction();
    } catch (error) {
      console.error(error);
    }
  }

  disconnectPlayer(name) {
    this.#deleteSoul(name, "players", "disconnect");
  }

  #iterateEventListeners(type, data) {
    this.#eventListener.iterateEventListeners(type, { type, ...data });
  }

  #deleteSoul(name, category, actionName = "delete") {
    const index = this.#game[category].findIndex((soul) => soul.name === name);

    if (index === -1) return;

    const soulPoints = this.#game[category][index].soulPoints;

    this.#game[category].splice(index, 1);

    this.#iterateEventListeners(this.#listenersNames.UPDATE_STATE, {
      dto: {
        [category]: this.#game[category],
      },
      action: { name: actionName, scope: { name } },
    });

    this.updateRanking();

    return { soulPoints };
  }
}
