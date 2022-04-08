const jwt=require('jsonwebtoken');
const verifyToken=async(req,res,next)=>{
    const token=req.body.token || req.query.token || req.headers["x-access-token"];
    // if(!token){
    //     return res.status(403).send("Need token");
    // }
    try{
        const bruce="key";
const decoded=await jwt.verify(token,bruce);
req.user=decoded;
    }catch(err){
res.status(401).send(err);
    }
    return next;
};
module.exports=verifyToken;