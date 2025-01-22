import UserController from "../controller/UserController.js";
import io from "../index.js";

io.of("/signup").on("connection", (socket) => {
  const userController = new UserController();
  socket.on("sign_up_submit", async ({ name, password }) => {
    try {
      if (await userController.isUsernameAlreadyExist(name))
        return socket.emit("username_already_exists", name);

      await userController.create({ name, password });

      socket.emit("sign_up_success");
    } catch (error) {
      console.error(error);
      socket.emit("sign_up_failed", error);
    }
  });
});
