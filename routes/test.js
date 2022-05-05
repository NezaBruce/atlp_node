const express = require('express');
const Blog = express.Router();
const {getall,createNew,commentblog,likeblog,getone,updateblog,deleteblog}=require("../controllers/blog");
import auth from "../middlewares/autha.js";
import isAdmin from "../middlewares/admina.js";
const path =require('path');
const multer = require('multer');
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PATH =  "../public/phots/"

Blog.get("/blog",getall);
Blog.get("/blog/:id",getone);
Blog.post("/Testblog",createNew);
Blog.put("/Testblog/:id",updateblog);
Blog.delete("/Testblog/:id",deleteblog);
module.exports = Blog;
