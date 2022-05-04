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
    // type:new mongoose.Schema({name:String})
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



// # Use the latest 2.1 version of CircleCI pipeline process engine.
// # See: https://circleci.com/docs/2.0/configuration-reference
// version: 2.1

// # Define a job to be invoked later in a workflow.
// # See: https://circleci.com/docs/2.0/configuration-reference/#jobs
// jobs:
//   say-hello:
//     # Specify the execution environment. You can specify an image from Dockerhub or use one of our Convenience Images from CircleCI's Developer Hub.
//     # See: https://circleci.com/docs/2.0/configuration-reference/#docker-machine-macos-windows-executor
//     docker:
//       - image: cimg/base:stable
//     # Add steps to the job
//     # See: https://circleci.com/docs/2.0/configuration-reference/#steps
//     steps:
//       - checkout
//       - run:
//           name: "Say hello"
//           command: "echo Hello, World!"

// # Invoke jobs via workflows
// # See: https://circleci.com/docs/2.0/configuration-reference/#workflows
// workflows:
//   say-hello-workflow:
//     jobs:
//       - say-hello
