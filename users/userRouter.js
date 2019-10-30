const express = require("express");
const Users = require("./userDb");

// ROUTER FUNCTIONALITY FROM EXPRESS
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  Users.get()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: `Error getting Users: ${error.message}` });
    });
});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
