const express = require("express");
const Posts = require("./postDb");

// ROUTER FUNCTIONALITY
const router = express.Router();

// BEGINNING OF ENDPOINTS
router.get("/", (req, res) => {
  Posts.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Could not retrieve posts: ${error.message}` });
    });
});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// END OF ENDPOINTS

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
