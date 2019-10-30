const express = require("express");
const Users = require("./userDb");

// ROUTER FUNCTIONALITY FROM EXPRESS
const router = express.Router();

// BEGINNING OF ENDPOINT DEFINITION

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  Users.get()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Error getting Users: ${error.message}` });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.data);
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// END OF ENDPOINT DEFINITION

// BEGINNING OF CUSTOM MIDDLEWARE

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(data => {
      if (data) {
        req.data = data;
        next();
      } else {
        res.status(404).json({ message: `User ${id} could not be found` });
      }
    })
    .catch(error => {
      console.log(data);
    });
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

// END OF MIDDLEWARE

module.exports = router;
