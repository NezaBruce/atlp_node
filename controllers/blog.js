import Blog from "../models/blog.js";
export const getall= (req, res) => {
  let query = Blog.find({});
  query.exec((err, Blogs) => {
    if(err) res.send(err);
    res.json(Blogs);
});
};
export const createNew= (req, res) => {
  var blog = new Blog({
...req.body,
author:"Declan rice"
  });
  blog.save(((err,blog) => {
    if(err) {
        res.send(err);
    }
    else {
        res.json({message: "Blog successfully added!", blog });
    }
}))
};
export const commentblog= async (req, res) => {
  const {id}=req.params;
  const {comment}=req.body;
  const commentedBlog=await Blog.findByIdAndUpdate(id,{
 $push:{
   comments:{
     user:"12368790hio8y80",
     comments:comment,
   }
  } 
},{new:true});
  res.send(commentedBlog);
};
export const likeblog= async (req, res) => {
  const {id}=req.params;
  const blog=await Blog.findById(id);
  const us=req.user.user_id;
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
}
};
export const getone = async (req, res) => {
  try {
    Blog.findById(req.params.id, (err, blog) => {
      if(err) res.send(err);
      res.json(blog);
  }); 
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
}
export const updateblog=  (req, res) => {
  try {
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
export const deleteblog=(req, res) => {
     Blog.deleteOne({ _id: req.params.id }, (err, result) => {
      res.json({ message: "Blog successfully deleted!", result });    
});
}
    // export{createNew,updateblog,deleteblog,likeblog,getall,getone,commentblog};