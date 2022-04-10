const mongoose = require('mongoose')

const BlogSchema =  mongoose.Schema({
  title: String,
  image: String,
  content: String,
  comments:[
    {
      user:{type:String},
      comments:{type:String}
    }
  ],
  author:{
    type:new mongoose.Schema({name:String})
  }
  ,
  like:[],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog;
// const Joi = require('joi');
// module.exports.Schemas ={
//   blogPostSchema:Joi.object().keys({ 
//   title: Joi.string().alphanum().min(3).max(30).required(),
//   content: Joi.string(),  
// })}
const Joi = require('joi')
  
//User-defined function to validate the user

const validateBlog=(prop)=>
{
  try{
  const JoiSchema = Joi.object().keys ({      
    title: Joi.string().min(5).max(30).required(),               
    content: Joi.string().min(250).max(2500000).required(), 
          });      
          return JoiSchema.validate(prop);
}catch(err){
  res.send(err);
}

}
  
// const {blog} = req.body
  
// const response = validateBlog()
  

module.exports.validateBlog=validateBlog;
// var commentSchema = new Schema({
//     comment: {type: String},
//     created: {type: Date, default: Date.now},
//     blog: { type: Schema.Types.ObjectId, ref: 'blog' }
// });

// var Comment = mongoose.model('comment', commentSchema);

// module.exports = Comment;
