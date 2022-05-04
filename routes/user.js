import express from 'express';
import jwt from 'jsonwebtoken';
const auth = express.Router();
import User from "../models/user.js";
import {validateUser} from "../models/user.js";
import bcrypt from "bcryptjs";
// import autha from "../middlewares/autha.js";
import crypto from "crypto"

auth.get("/users",async(req,res)=>{
    const user=await User.find();
    res.send(user);
})
auth.get("/users/:id",async(req,res)=>{
    const id=req.params.id;
    const user=await User.findById({_id:id});
    res.send(user);
})
auth.post('/register',async (req,res)=>{
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
        const code = crypto.randomInt(100000, 1000000);
        //validate input
        if(!(email && password && first_name && last_name)){
            res.send("All input are required!");
        }
        //check if user exits
        const olderuser=await User.findOne({email:email});
        if(olderuser){
            return res.status(409).send("User already Exists");
        }
        //encrypt user password
        const encryptedPassword=await bcrypt.hash(password,10);
        const user=new User({
            first_name:first_name,
            last_name:last_name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            verificationCode: code,
            // isadmin:req.body.isadmin
            // isadmin:true626174dab6bf470ab2585dfe
        });
        //create token
        // const token = await jwt.sign({user_id:user._id,email},"key",{expiresIn:"4h"});
        //save token
        // user.token=token;
        user.save(
            ((err,blog) => {
            if(err) {
                res.send(err);
            }
            else {
                res.json({message: "User successfully added!", blog });
            }
        }));
        // res.status(201).send(user);
    }catch(err){
        console.log(err);
    }
})
auth.post('/login',async (req,res)=>{
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
        if(!user) {
            res.status(404).json({
                message: "Failed login attempt",
                email: "Incorrect email",
                success: false,
            })
        }
        const encryptedPassword=await bcrypt.hash(password,10); 
        if(user && (await bcrypt.compare(password,user.password))){
            // res.status(409).send("User already Exits"); ,{expiresIn:"4h"}
            const token = jwt.sign({user_id:user._id,email,username:user.first_name,isadmin:user.isadmin},"key");
            user.token=token;
            res.status(200).send({user});
            // res.send("login successfully");
        }else{
     //encrypt user password
            
        //save token
        res.status(201).send("user not found");
        }
   
    }catch(err){
        res.send(err);
    }
})
auth.post("/verify", async(req,res)=>{
        try { 
            let { code } = req.body;
            const user = await User.findOne( { verificationCode: code });
            if(!user) {
                return res.status(404).json({
                    message: "Invalid code",
                    success: false
                }); 
            } else if(user.isEmailVerified) {
                return res.status(404).json({
                    message: "Email already verified",
                    success: false
                }); 
            }
            await user.update({ isEmailVerified: true});
            return res.status(201).json({
                message: "Email verification success",
                success: true
            }); 
        } catch (err) {
            
            return res.status(500).json({
                message: err.message,
                success: false
            })
        }
})
// auth.post("/changePassword",autha,async (req,res)=>{
//         try { 
//             let { oldPassword, newPassword } = req.body;
//             const user = await User.findById(req.user.user_id);
//             let isMatch = await bcrypt.compare(oldPassword, user.password);
//             if(isMatch) {
//                 const hashedPassword = await bcrypt.hash(newPassword, 10);
//                 await user.update({password: hashedPassword});
//                 return res.status(201).json({
//                     message: "Your password has been successfully reset",
//                     success: true
//                 }); 
//             } else {
//                 return res.status(404).json({
//                     message: "Your old password is incorrect",
//                     success: false
//                 }); 
//             }
//         } catch (err) {
//             return res.status(500).json({
//                 message: err.message,
//                 success: false
//             })
//     };
// })
auth.post("/welcome", auth,async (req, res) => {
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
auth.get("/profile/:id",async(req,res)=>{
    const id=req.params.id;
    const user=await User.findById({_id:id});
    res.send(user);
})
auth.patch("/profile/:id",async(req,res)=>{
    // if(req.user.user_id !=req.params.id){
    //     return "access denied!";
    // }
      try {
        //   const user = await
           User.findById({ _id: req.params.id },
            (err, user) => {
            if(err) res.send(err);
            Object.assign(user, req.body).save((err, user) => {
                     if(err) {res.send(err)};
                res.json({ message: 'user updated successfully!', user });
            })
        }
            ); 
        //   email
        // console.log("g")
        //   if (req.body.first_name) {
        //     user.first_name = req.body.first_name;
        //   }
      
        //   if (req.body.last_name) {
        //     user.last_name = req.body.last_name;
        //   }
        //   if (req.body.email) {
        //     blog.email = req.body.email;
        //   }
        //   await user.save();
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









export default auth;