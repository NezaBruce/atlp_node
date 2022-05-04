// const mongoose = require('mongoose')
// import express from 'express';
import Blog from "../models/blog.js";
// const router = express.Router();
// import {validateBlog} from '../models/blog.js'
 const getall= (req, res) => {
  let query = Blog.find({});
  query.exec((err, Blogs) => {
    if(err) res.send(err);
    res.json(Blogs);
});
};

 const createNew= (req, res) => {
//   const {error}= validateBlog(req.body);
//   if(error){  
//     res.send(error.details[0].message);
// }
  var blog = new Blog({
...req.body,
author:"Declan rice"
  });
  // const bloag=JSON.stringify(blog);
  // var blog = new Blog({
  //   title: req.body.title,
  //   image: req.body.image,
  //   content: req.body.content,
  // });
  blog.save(((err,blog) => {
    if(err) {
        res.send(err);
    }
    else {
        res.json({message: "Blog successfully added!", blog });
    }
}))
};
 const commentblog= async (req, res) => {
  // const blog=Blog.findOne({_id:req.params.id});
  const {id}=req.params;
  const {comment}=req.body;
  // const us=req.user.user_id;
const commentedBlog=await Blog.findByIdAndUpdate(id,{
 $push:{
   comments:{
     user:"12368790hio8y80",
     comments:comment,
   }
  } 
},{new:true});
  // await blog.save();   
  res.send(commentedBlog);
};
 const likeblog= async (req, res) => {
  // const blog=Blog.findOne({_id:req.params.id});
  const {id}=req.params;
  // const {like}=req.body;
  const blog=await Blog.findById(id);
  const us=req.user.user_id;
// blog.like =blog.like + like;
// blog.like.push(us);
if(blog){
if(!blog.like.includes(req.user.user_id)){
 const likedBlog= await Blog.findByIdAndUpdate({_id:id},{
   $push:{like:req.user.user_id}
  },{new:true});
   res.json({message:"liked",likedBlog});
}else{
  const removeLike=await Blog.findByIdAndUpdate({_id:id},{
    $pull:{like:req.user.user_id}
  },{new:true})
  res.json({message:"like removed", removeLike});
}
// return res.send();
}
// return likedBlog
  // await blog.save();
};
 const getone = async (req, res) => {
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
}
 const updateblog=  (req, res) => {
//   const {error}= validateBlog(req.body);
//   if(error){  
//     res.send(error.details[0].message);
// }
// const blog=req.body;
  try {
    // Blog.findByIdAndUpdate({_id: req.params.id},req.body, (err, blog) => {
    //   if(err) res.send(err);
    //   res.send(blog);
    // });
    Blog.findById({_id: req.params.id}, (err, blog) => {
      if(err) res.send(err);
      Object.assign(blog, req.body).save((err, blog) => {
        if(err) {res.send(err)};
          res.json({ message: 'Blog updated!', blog });
      });
  });
    } catch {
      res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};
 const deleteblog=(req, res) => {
     Blog.deleteOne({ _id: req.params.id }, (err, result) => {
      res.json({ message: "Blog successfully deleted!", result });    
});
}
// cloudinary.config({ 
//   cloud_name: 'inezabruce', 
//   api_key: '916588765219796', 
//   api_secret: 'IAwW3x8JzbUQvrPTjNnnWMkBy0I' 
// });,
    // "coverage": "nyc --reporter=lcov --reporter=text npm test"
    export{createNew,updateblog,deleteblog,likeblog,getall,getone,commentblog};