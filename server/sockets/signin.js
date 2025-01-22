import UserController from "../controller/UserController.js";
import io from "../index.js";
import User from "../model/User.js";

io.of("/signin").on("connection", (socket) => {
  const userController = new UserController();
  socket.on("sign_in_submit", async ({ name, password }) => {
    try {
      const user = await userController.getOne({ name });

      if (!user) return socket.emit("sign_in_invalid_fields");

      if (!User.isCorrectPassword(password, user.hashedPassword, user.salt))
        return socket.emit("sign_in_invalid_fields");

      const token = User.getToken({ username: name });

      socket.emit("sign_in_success", token);
    } catch (error) {
      console.error(error);
      socket.emit("sign_in_failed", error);
    }
  });
});
