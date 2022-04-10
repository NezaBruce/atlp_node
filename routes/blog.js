const express = require("express");
const router = express.Router();
const {getall,createNew,commentblog,likeblog,getone,updateblog,deleteblog}=require("../controllers/blog");
const auth = require("../middlewares/autha");
const middleware = require("../middlewares/middle");

router.get("/blog",getall);

router.post("/blog",auth, createNew);
router.patch("/comment/:id",auth,commentblog);
router.patch("/like/:id",auth,likeblog);
router.get("/blog/:id",getone);

router.patch("/blog/:id",auth,updateblog);

router.delete("/blog/:id",auth,deleteblog);
module.exports = router;