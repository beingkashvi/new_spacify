import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register=async(req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })

        await newUser.save()
        res.status(200).send("user has been created")
    }catch(err){
        next(err)
    }
}

export const login=async(req,res,next)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"user not found"))
        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,"wrong password or username"))

        //how a JWT (JSON Web Token) is created and used to authenticate a user in a web application:
        // When a user logs in:
        // Their credentials are verified (e.g., email and password).
        // A JWT is created with the user’s id and isAdmin status.
        // The JWT is stored securely in an httpOnly cookie.
        // The response also contains non-sensitive user details (e.g., username, email).

        //jwt.sign(payload, secretKey)
        //process.env.JWT:This is the secret key used to sign the token. It should be stored in your environment variables for security.
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        //destructure user data
        //user._doc contains the raw data fetched from the MongoDB document for the user.
        //Purpose: Exclude sensitive fields (password, isAdmin) from being included in the response sent back to the client.
        const {password,isAdmin,...otherDetails}=user._doc;
        //res.cookie(name, value, options)
        res.cookie("access_token",token,{
            httpOnly:true,
        })
        //httpOnly: true: Ensures the cookie cannot be accessed by JavaScript on the client-side, which prevents XSS (Cross-Site Scripting) attacks.
        .status(200).json({...otherDetails})
    }catch(err){
        next(err)
    }
}




