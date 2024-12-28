import Hotel from "../models/Hotel.js";

export const createHotel=async(req,res,next)=>{
    const newHotel= new Hotel(req.body)

    try{
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err);
    }
}

export const updateHotel=async(req,res,next)=>{
    try{
        //finding hotel by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err)
    }
}

export const deleteHotel=async (req,res,next)=>{
    try{
        //finding hotel by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    }catch(err){
        next(err)
    }
}

export const getHotel=async (req,res,next)=>{
    try{
        //finding hotel by id using req.param.id and setting it to the req.body using set
        //new.true: so that after updating, new version is returned in postman api
        const hotel=await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}

export const getAllHotels = async (req, res, next) => {
    try {
        const { min, max, limit, ...others } = req.query;

        // Build the query object
        const query = {
            ...others,
            ...(req.query.featured && { featured: req.query.featured === "true" }), // Convert 'true'/'false' to Boolean
            cheapestPrice: {
                $gt: parseInt(min) || 1, // Default minimum price
                $lt: parseInt(max) || 999, // Default maximum price
            },
        };

        // Fetch hotels with limit
        const hotels = await Hotel.find(query).limit(parseInt(limit) || 0); // 0 means no limit
        console.log("Query Params:", req.query); // Log query parameters
        console.log("Limit:", parseInt(limit)); // Log limit for debugging

        res.status(200).json(hotels); // Return the hotels data
    } catch (err) {
        next(err); // Pass errors to the next middleware
    }
};

export const countByCity=async (req,res,next)=>{
    //split to make them into array
    const cities=req.query.cities.split(",")
    try{
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}

export const countByType=async (req,res,next)=>{
    //split to make them into array
    try{
        const hotelCount= await Hotel.countDocuments({type:"hotel"})
        const apartmentCount= await Hotel.countDocuments({type:"apartment"})
        const resortCount= await Hotel.countDocuments({type:"resort"})
        const villaCount= await Hotel.countDocuments({type:"villa"})
        const cabinCount= await Hotel.countDocuments({type:"cabin"})
        
        res.status(200).json([
            {type:"hotels",count:hotelCount},
            {type:"apartments",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount},
        ])
    }catch(err){
        next(err)
    }
}


