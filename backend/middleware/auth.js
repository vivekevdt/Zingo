//to decode the token sended by user
import dotenv from 'dotenv';

import  jwt  from "jsonwebtoken";


const authMiddleware= async (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        res.json({sucees:false,message:"Not authorized login again"})
    }
    try{

        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

    
}


export default authMiddleware;