const express = require("express");
const Post = require("./models/post copy");
const router = express.Router();

router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/posts", async (req, res) => {
  const post = new Post({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  await post.save();
  res.send(post);
});
module.exports = router;