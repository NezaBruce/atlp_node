import mongoose from "mongoose"
import Joi from 'joi';
const BlogSchema =  mongoose.Schema({
  image: { type: String,required:true },
  cloudinary_id: { type: String,required:true },
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
    type:String,
  }
  ,
  like:[],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Blog = mongoose.model('Blog', BlogSchema)


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


export default Blog;
export {validateBlog};


