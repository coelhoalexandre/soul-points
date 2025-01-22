import express from "express";
import http from "http";
import path from "path";
import url from "url";
import { Server } from "socket.io";

const port = process.env.port || 3000;
const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicDir = path.join(currentPath, "../../public");

app.use("/", express.static(publicDir));
app.use("/cadastro", express.static(path.join(publicDir, "/pages/signup")));
app.use("/login", express.static(path.join(publicDir, "/pages/signin")));

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const io = new Server(httpServer);

export default io;
