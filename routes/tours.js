import express from 'express';
import { createTour, deleteTour, findAllTours, findTour, getFeauturedTour, getTourBySearch, getTourCounts, updateTour } from '../controllers/tourController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router()

//create a new Tour 

router.post("/", verifyUser, createTour);
//update a Tour 

router.put("/:id",verifyUser, updateTour);
//delete a Tour

router.delete("/:id",verifyAdmin, deleteTour);
//find a Tour

router.get("/:id", findTour);
//find  all Tours

router.get("/", findAllTours);

//Search Tours
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeauturedTour);
router.get("/search/getTourCounts", getTourCounts);
export default router;