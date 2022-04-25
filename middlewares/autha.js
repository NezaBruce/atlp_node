import jwt from 'jsonwebtoken';
const verifyToken=(req,res,next)=>{
    // const token=req.body.token || req.query.token || req.headers["x-access-token"];
    const bearerHeader=req.headers['authorization'];
    // console.log(bearerH)
    // const bearerH=JSON.stringify(bearerH);
    console.log(bearerHeader)
    if(typeof bearerHeader !== "undefined"){
        //split at the space
        const bearer=bearerHeader.split(' ');
        //    get token
        const bearerToken=bearer[1];
        req.token=bearerToken;
        console.log(req.token)
    const data=jwt.verify(req.token,"key");
    req.user=data;
    console.log(data);
    next();
   }
   else{
       res.send("Authentication needed");
   }
}
export default verifyToken;