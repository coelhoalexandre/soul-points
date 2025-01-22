import Soul from "./Soul.js";

export default class Player extends Soul {
  #colorOptions;
  constructor(
    playerObj,
    gameSize,
    pointsToChangeColor,
    { updateSoul, checkCollision }
  ) {
    super("Player", playerObj, gameSize, { updateSoul, checkCollision });
    this.#colorOptions = playerObj.colorOptions;
    this.pointsToChangeColor = pointsToChangeColor;
    this.color = this.#getColor(this.soulPoints);
    this.moveHandler = this.move.bind(this);
    this.enable();
  }

  enable() {
    window.addEventListener("keydown", this.moveHandler);
  }

  disable() {
    window.removeEventListener("keydown", this.moveHandler);
  }

  move(event) {
    if (event.code.startsWith("Arrow") || event.key.match(/a|w|s|d/)) {
      if (!(this.gameSize.width && this.gameSize.height))
        throw new Error("Game size not found");

      this.disable();

      setTimeout(this.enable.bind(this), 250).ref;

      const direction = event.code.startsWith("Arrow")
        ? event.code.replace("Arrow", "")
        : event.key;

      const lastPosition = { x: this.x, y: this.y };

      switch (direction) {
        case "Up":
        case "w":
          if (this.y > 0) this.y -= this.height;
          if (this.y < 0) this.y = 0;
          break;

        case "Down":
        case "s":
          if (this.y < this.gameSize.height) this.y += this.height;
          if (this.y >= this.gameSize.height)
            this.y = this.gameSize.height - this.height;
          break;

        case "Right":
        case "d":
          if (this.x < this.gameSize.width) this.x += this.width;
          if (this.x >= this.gameSize.width)
            this.x = this.gameSize.width - this.width;
          break;

        case "Left":
        case "a":
          if (this.x > 0) this.x -= this.width;
          if (this.x <= 0) this.x = 0;
          break;
      }

      if (!(lastPosition.x === this.x && lastPosition.y === this.y)) {
        const updateSoul = (
          nameSoulDestroyed,
          nameSoulVictorious,
          soulPoints,
          isPureSoul = false
        ) => {
          const params = {
            nameSoulDestroyed: nameSoulDestroyed,
            dto: {
              x: 999,
              y: 999,
              isDestroyed: true,
            },
          };

          if (isPureSoul)
            this.emitUpdateSoul.pureSoul(params.nameSoulDestroyed, params.dto);
          else
            this.emitUpdateSoul.player(params.nameSoulDestroyed, {
              lastSoulPoints: soulPoints,
              soulPoints: 0,
              color: this.#getColor(0),
              ...params.dto,
            });

          if (this.name === nameSoulVictorious)
            this.soulPoints = this.soulPoints + soulPoints;
          this.emitUpdateSoul.player(nameSoulVictorious, {
            soulPoints: this.soulPoints,
            x: this.x,
            y: this.y,
            color: this.#getColor(this.soulPoints),
          });
        };

        this.emitCheckCollision({ x: this.x, y: this.y }, (souls) => {
          let isPositionAvailable = true;

          souls.forEach((soul) => {
            if (soul.name === "PureSoul")
              updateSoul(soul.name, this.name, soul.soulPoints, true);
            else {
              if (this.soulPoints < soul.soulPoints || this.color == soul.color)
                isPositionAvailable = false;
              else {
                const condition = this.soulPoints > soul.soulPoints;
                updateSoul(
                  condition ? soul.name : this.name,
                  condition ? this.name : soul.name,
                  soul.soulPoints,
                  false
                );
              }
            }
          });

          if (isPositionAvailable) {
            this.ctx.clearRect(this.x, this.y, this.width, this.height);

            this.color = this.#getColor(this.soulPoints);

            this.emitUpdateSoul.player(this.name, {
              x: this.x,
              y: this.y,
              color: this.color,
            });

            return;
          }

          this.x = lastPosition.x;
          this.y = lastPosition.y;
        });
      }
    }
  }

  #getColor(soulPoints) {
    const index = Math.floor(soulPoints / this.pointsToChangeColor);
    const colorOptionsMaxIndex = this.#colorOptions.length - 1;
    const color =
      index < colorOptionsMaxIndex
        ? this.#colorOptions.colors[index][1]
        : this.#colorOptions.colors[colorOptionsMaxIndex][1];
    return color;
  }
}
