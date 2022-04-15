import mongoose from "mongoose"

const schema = mongoose.Schema({
  name: {type:String,required:true},
  email:{type:String,required:true},
  message: {type:String,required:true}
});

const contactModel = mongoose.model("contact", schema);
export default contactModel