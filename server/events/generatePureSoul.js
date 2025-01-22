import { pureSoulController } from "../sockets/game.js";

const generatePureSoul = (socket, name) => {
  const updatePureSoul = async (data) =>
    await pureSoulController.updateOne(
      { name },
      { isDestroyed: false, ...data }
    );
  socket.emit("generate_pure_soul", name, updatePureSoul);
};

export default generatePureSoul;
