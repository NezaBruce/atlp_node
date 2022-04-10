const mongoose=require("mongoose");
const userModel=new mongoose.Schema({
    first_name:{type:String,default:null},
    last_name:{type:String,default:null},
    email:{type:String,unique:true},
    password:{type:String},
    token:{type:String},
})
module.exports=mongoose.model("user",userModel);
const validateUser=(prop)=>
{
  try{
  const JoiSchema = Joi.object().keys ({      
    first_name: Joi.string().min(5).max(10).required(),               
    last_name: Joi.string().min(5).max(10).required(),               
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(4).alphanum().required()
          });      
          return JoiSchema.validate(prop);
}catch(err){
  res.send(err);
}

}
module.exports.validateUser=validateUser;