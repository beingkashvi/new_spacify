import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"

const app=express();
dotenv.config();

/*An async function always returns a promise. Within this function, you can use the await keyword to pause the execution of the function until a promise is resolved or rejected.*/
const connect=async()=>{
   try {
    /*mongoose.connect() is a promise-based function. It returns a promise that either:
Resolves (fulfills) if the connection is successful.
Rejects if the connection fails (e.g., invalid credentials or network issues).
 */
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected")
})

//middlewares:able to hanle req and res before sending anything to user
//whenever a user makes an api request, the app will come here and check all middlewares
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

// app.use((req,res,next)=>{
//   console.log("hi i am a middleware")
// })

//error handling middleware
app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500
  const errorMessage=err.message || "Something went wrong"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  })
})

app.listen(8800, ()=>{
    connect()
    console.log("connected to backend!");
})