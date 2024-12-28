import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router=express.Router();

router.post("/:hotelId",verifyAdmin, createRoom)
//update
router.put("/:id",verifyAdmin,updateRoom)
//dlt
router.delete("/:id/:hotelId",verifyAdmin, deleteRoom)
//get
router.get("/:id", getRoom)
//get all
router.get("/", getAllRooms)
export default router
