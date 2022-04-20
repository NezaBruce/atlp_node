import express from 'express';
const Blog = express.Router();
import {getall,createNew,commentblog,likeblog,getone,updateblog,deleteblog} from "../controllers/blog.js";
import auth from "../middlewares/autha.js";
import isAdmin from "../middlewares/admina.js";

Blog.get("/blog",getall);

// Blog.post("/blog",auth,isAdmin, createNew);
// Blog.patch("/comment/:id",auth,commentblog);
// Blog.patch("/like/:id",auth,likeblog);
Blog.post("/blog", createNew);
Blog.patch("/api/comments",commentblog);
Blog.patch("/blog/:id",likeblog);
Blog.get("/blog/:id",getone);

Blog.patch("/blog/:id",updateblog);
// Blog.patch("/blog/:id",auth,updateblog);

Blog.delete("/blog/:id",deleteblog);
// Blog.delete("/blog/:id",auth,deleteblog);
Blog.post("/Testblog", createNew);
Blog.put("/Testblog/:id",updateblog);
Blog.delete("/Testblog/:id",deleteblog);
export default Blog;