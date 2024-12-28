import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import {createError} from "../utils/error.js";

export const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelId;
    const newRoom=new Room(req.body)
    try{
        const savedRoom=await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms:savedRoom._id},
            })
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
}

export const updateRoom=async(req,res,next)=>{
    try{
        //finding Room by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRoom)
    }catch(err){
        next(err)
    }
}

export const deleteRoom=async (req,res,next)=>{
    const hotelId=req.params.hotelId;
    try{
        //finding Room by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms:req.params.id},
            })
        }catch(err){
            next(err)
        }
        res.status(200).json("Room has been deleted")
    }catch(err){
        next(err)
    }
}

export const getRoom=async (req,res,next)=>{
    try{
        //finding Room by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        const room=await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}

export const getAllRooms=async (req,res,next)=>{
    try{
        const rooms=await Room.find()
        res.status(200).json(rooms)
    }catch(err){
        next(err)
    }
}




