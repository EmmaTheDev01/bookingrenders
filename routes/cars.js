import express from 'express';
import { createCar, deleteCar, findAllCars, findCar, getFeauturedCar, getCarBySearch, getCarCounts, updateCar } from '../controllers/carController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router()

//create a new Car 

router.post("/", verifyUser, createCar);
//update a Car 

router.put("/:id",verifyAdmin, updateCar);
//delete a Car

router.delete("/:id",verifyAdmin, deleteCar);
//find a Car

router.get("/:id", findCar);
//find  all Cars

router.get("/", findAllCars);

//Search Cars
router.get("/search/getCarBySearch", getCarBySearch);
router.get("/search/getFeaturedCars", getFeauturedCar);
router.get("/search/getCarCounts", getCarCounts);
export default router;