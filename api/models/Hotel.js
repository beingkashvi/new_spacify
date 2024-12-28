import mongoose from 'mongoose';
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const { Schema } = mongoose;

const HotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        min:0,
        max:5
    },
    rooms:{
        type:[String],
    },
    cheapestPrice:{
        type:Number,
        required:true,
    },
    featured:{
        type:Boolean,
        default:false,
    },
});

export default mongoose.model("Hotel",HotelSchema)
