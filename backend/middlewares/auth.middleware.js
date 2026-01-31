const jwt=require("jsonwebtoken");

exports.authenticate=async(req,res,next)=>{
    try {
        
       const token=req.cookies?.token || req.headers["token"];
    //    console.log(token)  

       if(!token){
         return res.status(400).json({
            message:"Please Login First"
         })
       }

       const payload=jwt.verify(token,process.env.TOKEN_PASSKEY);
       if(!payload){
        return res.status(400).json({
            message:"Payload are not created"
        })
       }

       req.payload=payload;
next();

    } catch (error) {
        console.log("Error In Authentication",error)
        return res.status(500).json({
            message:"Internal server Error"
        })
    }
}
