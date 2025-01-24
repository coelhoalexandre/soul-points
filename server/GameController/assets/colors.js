// const color = {
//   teal: "rgb(45, 212, 191)",
//   emerald: "rgb(52, 211, 153)",
//   green: "rgb(74, 222, 128)",
//   lime: "rgb(163, 230, 53)",
//   yellow: "rgb(250, 204, 21)",
//   amber: "rgb(251, 191, 36)",
//   orange: "rgb(251, 146, 60)",
//   red: "rgb(248, 113, 113)",
//   rose: "rgb(251, 113, 133)",
//   pink: "rgb(244, 114, 182)",
//   fuchsia: "rgb(232, 121, 249)",
//   purple: "rgb(192, 132, 252)",
//   violet: "rgb(167, 139, 250)",
//   indigo: "rgb(129 ,140 ,248 )",
//   blue: "rgb(96, 165, 250)",
//   sky: "rgb(56, 189, 248)",
//   cyan: "rgb(34, 211, 238)",
// };

const allColors = [
  ["teal", "rgb(45, 212, 191)"],
  ["emerald", "rgb(52, 211, 153)"],
  ["green", "rgb(74, 222, 128)"],
  ["lime", "rgb(163, 230, 53)"],
  ["yellow", "rgb(250, 204, 21)"],
  ["amber", "rgb(251, 191, 36)"],
  ["orange", "rgb(251, 146, 60)"],
  ["red", "rgb(248, 113, 113)"],
  ["rose", "rgb(251, 113, 133)"],
  ["pink", "rgb(244, 114, 182)"],
  ["fuchsia", "rgb(232, 121, 249)"],
  ["purple", "rgb(192, 132, 252)"],
  ["violet", "rgb(167, 139, 250)"],
  ["indigo", "rgb(129 ,140 ,248 )"],
  ["blue", "rgb(96, 165, 250)"],
  ["sky", "rgb(56, 189, 248)"],
  ["cyan", "rgb(34, 211, 238)"],
];

const pureSoul = allColors.pop();

const player = allColors;

export default {
  player,
  pureSoul,
  playerLength: allColors.length,
};
