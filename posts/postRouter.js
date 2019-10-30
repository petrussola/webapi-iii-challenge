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

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.data);
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// END OF ENDPOINTS

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then(data => {
      if (data) {
        req.data = data;
        next();
      } else {
        res.status(404).json({ message: "invalid post id" });
      }
    })
    .catch(error => {
      res.status(400).json({ message: `Error message: ${error.message}` });
    });
}

module.exports = router;
