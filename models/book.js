import mongoose from "mongoose"
// let Schema = mongoose.Schema;
const BookSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Number, required: true},
    createdAt: { type: Date, default: Date.now },    
  }
  
//   , 
//   { 
//     versionKey: false
//   }
);
// установить параметр createdAt равным текущему времени
// BookSchema.pre('save', next => {
//   now = newDate();
//   if(!this.createdAt) {
//     this.createdAt = now;
//   }
//   next();
// });
const Book = mongoose.model('book', BookSchema);
export default Book;


































// title: { type: String, required: true },
// author: { type: String, required: true },
// year: { type: Number, required: true },
// pages: { type: Number, required: true, min: 1 },
// createdAt: { type: Date, default: Date.now },    