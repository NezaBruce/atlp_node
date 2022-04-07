const express = require("express");
const router = express.Router();
const {getall,createNew,commentblog,getone,updateblog,deleteblog}=require("../controllers/blog");
router.get("/blog",getall);

router.post("/blog", createNew);
router.patch("/comment/:id",commentblog);
router.get("/blog/:id",getone);

router.patch("/blog/:id",updateblog);

router.delete("/blog/:id",deleteblog);
module.exports = router;