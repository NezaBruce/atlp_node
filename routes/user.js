const express = require("express");
const router = express.Router();
const User=require("../models/user");
const {validateUser}=require("../models/user");
const bcrypt=require("bcryptjs");
const auth = require("../middlewares/autha");
const jwt=require('jsonwebtoken');
router.get("/reg",async(req,res)=>{
    const user=await User.find();
    res.send(user);
})
router.post('/reg',async (req,res)=>{
    try{
        const {error}= validateUser(req.body);
        // res.send("hi")
        if(error){  
          res.send(error.details[0].message);
      }
        //get user input
        // const {first_name,last_name,email,password}=req.body;
        const first_name=req.body.first_name;
        const last_name=req.body.last_name;
        const email=req.body.email;
        const password=req.body.password;
        //validate input
        if(!(email && password && first_name && last_name)){
            res.send("All input are required!");
        }
        //check if user exits
        const olderuser=await User.findOne({email:email});
        if(olderuser){
            return res.status(409).send("User already Exits");
        }
        //encrypt user password
        const encryptedPassword=await bcrypt.hash(password,10);
        const user=new User({
            first_name:first_name,
            last_name:last_name,
            email:email.toLowerCase(),
            password:encryptedPassword
        });
        //create token
        // const token = await jwt.sign({user_id:user._id,email},"key",{expiresIn:"4h"});
        //save token
        // user.token=token;
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.send(err);
    }
})
router.post('/log',async (req,res)=>{
    try{
        //get user input
        const {email,password}=req.body;
        // const first_name=req.body.first_name;
        // const last_name=req.body.last_name;
        // const email=req.body.email;
        // const password=req.body.password;
        //validate input
        if(!(email && password)){
            res.status(400).send("All input are required!");
        }
        //check if user exits
        const user=await User.findOne({email});
        const encryptedPassword=await bcrypt.hash(password,10); 
        if(user && (await bcrypt.compare(password,user.password))){
            // res.status(409).send("User already Exits"); ,{expiresIn:"4h"}
            const token = await jwt.sign({user_id:user._id,email},"key");
            user.token=token;
            res.status(200).send({user});
            // res.send("login successfully");
        }else{
     //encrypt user password
            
        //save token
        res.status(201).send("user");
        }
   
    }catch(err){
        res.send(err);
    }
})

router.post("/welcome", auth,async (req, res) => {
    // const bruce="key";
//   (err,authData)=>{
    // if(err){
        // res.status(403)
        // res.send(err)
    // }else{        
        res.status(200).send("Welcome 🙌 ");
        // res.status(200).send(authData);
    // }
    // };
});
router.patch("/profile/:id",auth,async(req,res)=>{
      try {
          const user = await User.findOne({ _id: req.params.id }); 
        //   email
        console.log("g")
          if (req.body.first_name) {
            user.first_name = req.body.first_name;
          }
      
          if (req.body.last_name) {
            user.last_name = req.body.last_name;
          }
          if (req.body.email) {
            blog.email = req.body.email;
          }
      
          await user.save();
          res.send(user);
        } catch {
          res.status(404);
        //   res.send({ error: "user doesn't exist!" });
        }
})































// Redirect the user to the Google signin page 
// app.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["email", "profile"] })
//    );
//    // Retrieve user data using the access token received 
//    app.get(
//     "/auth/google/callback",
//     passport.authenticate("google", { session: false }),
//     (req, res) => {
//     res.redirect("/profile/");
//     }
//    );
//    // profile route after successful sign in 
//    app.get("/profile", (req, res) => {
//     console.log(req);
//     res.send("Welcome");
//    });










module.exports=router;