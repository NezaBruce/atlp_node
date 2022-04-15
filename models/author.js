import mongoose from "mongoose"

const BlogSchema =  mongoose.Schema({
  name: String,
})

const Author = mongoose.model('author', BlogSchema)

export default Author;

// var commentSchema = new Schema({
//     comment: {type: String},
//     created: {type: Date, default: Date.now},
//     blog: { type: Schema.Types.ObjectId, ref: 'blog' }
// });

// var Comment = mongoose.model('comment', commentSchema);

// module.exports = Comment;
