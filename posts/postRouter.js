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

router.delete("/:id", validatePostId, (req, res) => {
  Posts.remove(req.data.id)
    .then(data => {
      res
        .status(200)
        .json({ message: `Post ${req.data.id} has been deleted.` });
    })
    .catch(error => {
      res
        .status(400)
        .json({ message: `Post ${req.data.id} could not be deleted` });
    });
});

router.put("/:id", [validatePostId, validatePost], (req, res) => {
  Posts.update(req.data.id, req.body)
    .then(data => {
      res.status(200).json({ message: `Post ${req.data.id} has been edited` });
    })
    .catch(error => {
      res
        .status(400)
        .json({ message: `Post ${req.data.id} could not be edited` });
    });
});

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

function validatePost(req, res, next) {
  if (Object.keys(req.body).length) {
    if (req.body.text || req.body.user_id) {
      next();
    } else {
      res.status(400).json({ message: "missing required text/user_id field" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
