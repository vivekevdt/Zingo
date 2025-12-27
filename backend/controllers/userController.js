import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator";


// login user
const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user =await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }

        const isWatch = await bcrypt.compare(password,user.password);

        if(!isWatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
         res.json({success:true,token,message:"Welcome , You logged in"})
    }
    catch(err){
        console.log(err);
         res.json({success:false,message:"Error"});
    }

    
}


// create token

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);

}


// register user
const registerUser = async (req,res)=>{
    const {name,password,email}=req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        // validating email format and validate strong password
        if(!validator.isEmail(email)){
           return  res.json({success:false,message:"Please enter valid email"})
        }
        if(password.length<8){
           return  res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing our password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token =createToken(user._id)
        res.json({success:true,token});


    }
    catch(err){

        console.log(err);
        res.json({success:false,message:"Error"});
        
    }

}

export{loginUser,registerUser};


