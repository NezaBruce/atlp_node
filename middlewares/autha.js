import jwt from 'jsonwebtoken';
const verifyToken=async(req,res,next)=>{
    // const token=req.body.token || req.query.token || req.headers["x-access-token"];
    const bearerHeader=req.headers['authorization'];
   if(typeof bearerHeader !== "undefined"){
       //split at the space
       const bearer=bearerHeader.split(' ');
    //    get token
    const bearerToken=bearer[1];
    req.token=bearerToken;
    const data=await jwt.verify(req.token,"key");
    req.user=data;
    console.log(data);
    next();
   }
   else{
       res.send("Authentication needed");
   }
}
export default verifyToken;