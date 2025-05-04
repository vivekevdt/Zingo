import mongoose from "mongoose";

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://vivkkmr18:bodynS0ul@cluster0.78jyrqz.mongodb.net/FOODIE")
    .then(()=>{
        console.log('Db connected');
    })

}

export default connectDB;