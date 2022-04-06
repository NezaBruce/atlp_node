const express = require("express");
const Blog = require("../models/blog.js");
const router = express.Router();

router.get("/blog", async (req, res) => {
  const Blogs = await Blog.find();
  res.send(Blogs);
});

router.post("/blog", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
  });
  await blog.save();
  res.send(blog);
});
router.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.patch("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

    if (req.body.title) {
      blog.title = req.body.title;
    }

    if (req.body.image) {
      blog.content = req.body.image;
    }
    if (req.body.content) {
      blog.content = req.body.content;
    }

    await blog.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});
module.exports = router;