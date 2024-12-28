import User from "../models/Hotel.js";

export const updateUser=async(req,res,next)=>{
    try{
        //finding hotel by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        next(err)
    }
}

export const deleteUser=async (req,res,next)=>{
    try{
        //finding User by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        next(err)
    }
}

export const getUser=async (req,res,next)=>{
    try{
        //finding User by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}

export const getAllUsers=async (req,res,next)=>{
    try{
        const users=await User.find()
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
}