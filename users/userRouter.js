const express = require("express");
const Users = require("./userDb");

// ROUTER FUNCTIONALITY FROM EXPRESS
const router = express.Router();

// BEGINNING OF ENDPOINT DEFINITION

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(200)
        .json({ message: `Error while posting user: ${error.message}` });
    });
});

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

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.data.id)
    .then(data => {
      res
        .status(200)
        .json({ message: `User ${req.data.id} has been succesfully deleted` });
    })
    .catch(error => {
      console.log(error);
    });
});

router.put("/:id", [validateUserId, validateUser], (req, res) => {
  Users.update(req.data.id, req.body)
    .then(data => {
      res.status(200).json({
        ...req.body,
        id: req.data.id
      });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `There was an error deleting User ${req.data.id}` });
    });
});

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
      res.status(400).json({ message: `Error message: ${error}` });
    });
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {}

// END OF MIDDLEWARE

module.exports = router;
