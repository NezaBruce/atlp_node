// const mongoose = require('mongoose')
const express = require("express");
const Blog = require("../models/blog");
// const router = express.Router();

module.exports.getall= async (req, res) => {
  const Blogs = await Blog.find();
  res.send(Blogs);
};

module.exports.createNew= async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
  });
  await blog.save();
  res.send(blog);
};
module.exports.commentblog= async (req, res) => {
  // const blog=Blog.findOne({_id:req.params.id});
  const {id}=req.params;
  const {comment}=req.body;
  const blog=await Blog.findById(id);
blog.comments.push(comment);
const commentedBlog=await Blog.findByIdAndUpdate(id,blog,{new:true});
  // await blog.save();
  res.send(commentedBlog);
};
module.exports.getone = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

module.exports.updateblog=  async (req, res) => {
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
};

module.exports.deleteblog=  async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};