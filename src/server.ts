import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import routes from "./routes/index";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use("/api", routes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
