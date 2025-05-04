import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item;

const addFood = async (req,res)=>{
    
    let image_filename= `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.dsescription,
        price:req.body.price,
        category:req.body.category,
        image:image_filename

    })

   try{
    await food.save()
    res.json({success:true,message:"Food Added"})
   }
   catch(err){
    console.log(err);
    res.json({success:false,message:"Error"})
   }
}


// all food list

const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(err){
        console.log(error);
        res.json({sucess:false,message:"Error"});

    }

}



// remove food item
const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        // fs.unlink(`uploads/${food.image}`,()=>{}); //delete image from uploads folder
        
        
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message:"food removed"})
    }
    catch(err){
        console.log(err);
        res.json({sucess:false,message:"Error"});
        
    }

}


export {addFood,listFood,removeFood};