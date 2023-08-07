import express from "express";
import { createRoom, updateRoom } from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.post('/:hotelId',verifyAdmin , createRoom);
router.put('/:hotelId',verifyAdmin , updateRoom);

export default router;