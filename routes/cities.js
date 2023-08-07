import express from 'express';
import { createCity, deleteCity, findAllCities, getCityCounts, updateCity } from '../controllers/CityController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router()

//create a new City 

router.post("/",verifyUser, createCity);
//update a City 

router.put("/:id",verifyAdmin, updateCity);
//delete a City

router.delete("/:id",verifyAdmin, deleteCity);
//find  all Citys

router.get("/", findAllCities);

//Search Citys
router.get("/search/getCityCounts", getCityCounts);
export default router;