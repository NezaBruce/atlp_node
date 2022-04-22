import mongoose from "mongoose"
import Joi from 'joi';
const BlogSchema =  mongoose.Schema({
  image: { type: String,required:true },
  category: { type: String },
  title: { type: String },
  content: { type: String },
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

// module.exports = Blog;
const validateBlog=(prop)=>
{
  try{
  const JoiSchema = Joi.object().keys ({      
    title: Joi.string().min(5).max(30).required(),               
    content: Joi.string().min(5).max(2500000).required(), 
          });      
          return JoiSchema.validate(prop);
}catch(err){
  res.send(err);
}

}

// module.exports.validateBlog=validateBlog;
export default Blog;
export {validateBlog};