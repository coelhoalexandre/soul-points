import colors from "./color.js";

export const gameObj = {
  size: { width: 400, height: 400 },
};

const soulColor = colors[colors.length - 1];
colors.pop();

export const cellSize = 20;

export const soulObj = {
  width: cellSize,
  height: cellSize,
  color: soulColor[1],
};

export const playerObj = {
  soulPoints: 0,
  width: cellSize,
  height: cellSize,
  colorOptions: { colors, length: colors.length },
};

export const pointsToChangeColor = 10;
