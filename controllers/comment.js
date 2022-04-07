const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();

// router.get("/comment", async (req, res) => {
//   const comment = await Comment.find();
//   if(comment){
//     res.send(comment);
//   }else{
//     res.send("nothing to show");
//   }
// });

router.post("/comment/:id", async (req, res) => {
  const comment = new Comment({
    id: req.params.id,
    comment: req.body.comment,
  });
  await post.save();
  res.send(post);
});
module.exports = router;