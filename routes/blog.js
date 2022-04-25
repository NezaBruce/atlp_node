import express from 'express';
const Blog = express.Router();
import {getall,createNew,commentblog,likeblog,getone,updateblog,deleteblog} from "../controllers/blog.js";
import auth from "../middlewares/autha.js";
import isAdmin from "../middlewares/admina.js";
import path from 'path';
import multer from 'multer';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PATH =  "../public/phots/"
Blog.get("/blog",getall);

// Blog.post("/blog",auth,isAdmin, createNew);
// Blog.patch("/comment/:id",auth,commentblog);
// Blog.patch("/likes/:id",auth,likeblog);
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
    storage: storage,
  });
Blog.post("/blog", 
  upload.any("files")
);
Blog.post("/blog",auth,isAdmin, async (req,res)=>{
    createNew(req,res);
});
Blog.patch("/api/likes/:id",auth,likeblog);
Blog.patch("/api/comments/:id",auth,commentblog);
Blog.get("/api/comments/:id",auth,getone);
// Blog.patch("/blog/:id",likeblog);
Blog.get("/blog/:id",getone);

Blog.patch("/blog/:id",auth,isAdmin,updateblog);
// Blog.patch("/blog/:id",auth,updateblog);

Blog.delete("/blog/:id",auth,isAdmin,deleteblog);
// Blog.delete("/blog/:id",auth,deleteblog);
Blog.post("/Testblog",createNew);
Blog.put("/Testblog/:id",updateblog);
Blog.delete("/Testblog/:id",deleteblog);
export default Blog;
// my day was good, and I have managed to finalize swagger documentation and i tried to work on testing badge but it didn't work hence travis ci need credit card and that was my blocker. Eloi in next