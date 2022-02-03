const express = require("express");
const cors = require("cors");

const authRouter = require("./auth/auth-router");
const userRouter = require("./users/users-router");
const recipeRouter = require("./recipes/recipes-router");
const server = express();

server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/recipes", recipeRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found.` });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
  });
});

module.exports = server;
