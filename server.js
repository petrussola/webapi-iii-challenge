const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./users/userRouter");

const server = express();

// PLUG DEPENDENCIES
server.use(helmet());
server.use(cors());
server.use(express.json());

// USERS ROUTER

server.use("/users", userRouter);

// ENDPOINTS

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
