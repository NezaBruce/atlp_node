const express = require('express');
const Blog = express.Router();
// import {getall,createNew,commentblog,likeblog,getone,updateblog,deleteblog} from "../controllers/blog.js";
const {getall,createNew,commentblog,likeblog,getone,updateblog,deleteblog}=require("../controllers/blog");
// import auth from "../middlewares/autha.js";
// import isAdmin from "../middlewares/admina.js";
const path =require('path');
const multer = require('multer');
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const PATH =  "../public/phots/"
 
const cloudinary = require('cloudinary');

Blog.get("/blog",getall);

// Blog.post("/blog",auth,isAdmin, createNew);
// Blog.patch("/comment/:id",auth,commentblog);
// Blog.patch("/likes/:id",auth,likeblog);
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, PATH));
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname;
    //   const fileName = path.dirname(file.originalname)  + Date.now() + path.extname(file.originalname);
      req.body.image = fileName;
      cb(null, fileName);
    },
  });
  const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
      let ext=path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true)
    },
    //a0h5mrhh
    //https://api.cloudinary.com/v1_1/inezabruce/image/upload
  });
  const clod=cloudinary.v2;
  clod.config({ 
      cloud_name: 'inezabruce', 
      api_key: '916588765219796', 
      api_secret: 'IAwW3x8JzbUQvrPTjNnnWMkBy0I' 
  });
  
Blog.post("/blog",
  upload.single("image"),
  async (req,res)=>{
    try{
      // const result =await clod.uploader.upload(req.file.path);
      // {result.public_id,result.secure_url} 
      // req.body.image=result.secure_url;
      req.body.cloudinary_id="result.public_id";
      req.body.category="Tech";
      console.log(req.body.image);
      createNew(req,res);
    } catch (err) {
      console.log(err);
    }
  }
); 
Blog.post("/blog", async (req,res)=>{
    createNew(req,res);
});
Blog.patch("/blog/:id/likes",likeblog);
Blog.patch("/api/:id/comments",commentblog);
Blog.get("/api/:id/comments",getone);
Blog.get("/api/:id/comments",(req,res)=>{
  try {
    // const blog = await Blog.findOne({ _id: req.params.id });
    Blog.findById(req.params.id, (err, blog) => {
      if(err) res.send(err);
      res.json(blog);
  }); 
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});
// Blog.patch("/blog/:id",likeblog);
Blog.get("/blog/:id",getone);

// Blog.patch("/blog/:id",auth,isAdmin,updateblog);
Blog.patch("/blog/:id",updateblog);

// Blog.delete("/blog/:id",auth,isAdmin,deleteblog);
Blog.delete("/blog/:id",deleteblog);
Blog.post("/Testblog",createNew);
Blog.put("/Testblog/:id",updateblog);
Blog.delete("/Testblog/:id",deleteblog);
module.exports = Blog;
