const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog;

// var commentSchema = new Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'user' },
//     comment: {type: String},
//     created: {type: Date, default: Date.now},
//     blog: { type: Schema.Types.ObjectId, ref: 'blog' }
// });

// var Comment = mongoose.model('comment', commentSchema);

// module.exports = Comment;
