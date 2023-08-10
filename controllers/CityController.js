import City from "../models/Cities.js";

export const createCity = async (req, res) => {
    const newCity = new City(req.body);
    try {
        const savedCity = await newCity.save();
        res.status(200).json({
            success: true,
            message: "City saved succesfully",
            data: savedCity
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'City not saved, try again'
        });
    }
};

//Updating Citys 

export const updateCity = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedCity = await City.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({
            success: true,
            message: "succesfully updated City",
            data: updatedCity
        });

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'City not deleted, try again'
        });

    }
};
//delete a City
export const deleteCity = async (req, res) => {
    const id = req.params.id
    try {
        await City.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'You have deleted a City succesfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete a City'
        });

    }
};

//find all Cities
export const findAllCities = async (req, res) => {

    //pagination

    const page = parseInt(req.query.page);
    try {
        const allCitys = await City.find({}).skip(page * 9).limit(9);
        res.status(200).json({
            success: true,
            count: allCitys.length,
            message: 'All Citys available',
            data: allCitys
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No Citys available'
        })

    }
};
export const getCityCounts = async (req, res) => {

    try {
        const CityCount = await City.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            message: 'Featured Citys',
            data: CityCount,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No Cities available'
        })

    }
};