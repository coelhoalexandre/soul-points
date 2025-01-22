import User from "../model/User.js";

const authenticateUser = (socket, next) => {
  const accessToken = socket.handshake.auth.accessToken;

  try {
    const payloadToken = User.verifyToken(accessToken);
    socket.username = payloadToken.username;
    socket.emit("authenticated_user", payloadToken.username);
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
