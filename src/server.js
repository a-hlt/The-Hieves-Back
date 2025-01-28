const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const routes = require("./routes/index");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:5173", // Remplacez par l'URL de votre application React
		methods: ["GET", "POST"],
	},
});

app.use(express.json());
app.use("/api", routes);

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	socket.on("sendMessage", (data) => {
		console.log("Message received:", data);
		io.emit("message", { id: Date.now(), type: "user", text: data });
		// Simuler une réponse automatique
		setTimeout(() => {
			socket.emit("message", {
				id: Date.now() + 1,
				type: "bot",
				text: "Alerte veuillez vous éloignez le plus possible des zones indiqués !  ",
			});
		}, 1000);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

const PORT = 4000;
httpServer.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
