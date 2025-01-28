import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';

const PORT = process.env.PORT || 4000;

// Création du serveur HTTP
const httpServer = createServer(app);

// Configuration de Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Remplace par l'URL de ton application React
    methods: ["GET", "POST"],
  },
});

// Gestion des événements Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    // Émission du message à tous les clients
    io.emit("message", { id: Date.now(), type: "user", text: data });

    // Simuler une réponse automatique
    setTimeout(() => {
      io.emit("message", {
        id: Date.now() + 1,
        type: "bot",
        text: "Alerte : veuillez vous éloigner des zones indiquées !",
      });
    }, 1000);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Lancer le serveur HTTP
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
