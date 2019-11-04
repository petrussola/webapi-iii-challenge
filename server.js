const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

// PLUG DEPENDENCIES
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

// USERS ROUTER

server.use("/users", userRouter);
server.use('/posts', postRouter)

// ENDPOINTS

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date}`);
  next();
}

module.exports = server;
