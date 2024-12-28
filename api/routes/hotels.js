import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

//create
//async because connecting to db will take time
router.post("/",verifyAdmin, createHotel)
//update
router.put("/:id",verifyAdmin,updateHotel)
//dlt
router.delete("/:id",verifyAdmin, deleteHotel)
//get
router.get("/find/:id", getHotel)
//get all
router.get("/", getAllHotels)

router.get("/countByCity",countByCity)
router.get("/countByType",countByType)


export default router