import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import chatRouter from "./routes/chat.js";


import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";


// app config
const app=express();
const port=process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();


// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/chat", chatRouter); 



app.get("/",(req,res)=>{
    res.send("api working")
})


app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})

