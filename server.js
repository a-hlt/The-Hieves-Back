import express from "express";
import cors from "cors";
import app from "express/lib/application.js";
import {Server} from "socket.io";
import usersRouter from "./routes/usersRouter.js";
import {createServer} from "http";
import routes from "./routes";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// Add a basic route
const version = "/v1";
app.use(version + "/users", usersRouter);
app.use(version + "/api", routes);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});



// start server
const PORT = 4000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



