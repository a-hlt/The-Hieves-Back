import express from "express";
import cors from "cors";
import app from "express/lib/application.js";
import usersRouter from "./routes/usersRouter.js";


app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// Add a basic route
const version = "/v1";
app.use(version + "/users", usersRouter);

// start server
app.listen(3000, () => {
    console.log('http://localhost:3000/');
});



