const jwt=require('jsonwebtoken');
const verifyToken=async(req,res,next)=>{
    // const token=req.body.token || req.query.token || req.headers["x-access-token"];

    const bearerHeader=req.headers['authorization'];
   if(typeof bearerHeader !== "undefined"){
       //split at the space
       const bearer=bearerHeader.split(' ');
    //    get token
    const bearerToken=bearer[1];
    req.token=bearerToken;
    await jwt.verify(req.token,"key")
    next();

   }
   else{
       res.sendStatus(404)
   }
}
module.exports=verifyToken;