import Tour from "../models/Tour.js";
import Review from "../models/Review.js";


export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: "Tour saved succesfully",
            data: savedTour
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Tour not saved, try again'
        });
    }
};

//Updating Tours 

export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({
            success: true,
            message: "succesfully updated Tour",
            data: updatedTour
        });

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Tour not deleted, try again'
        });

    }
};
//delete a Tour
export const deleteTour = async (req, res) => {
    const id = req.params.id
    try {
        await Tour.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'You have deleted a Tour succesfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete a Tour'
        });

    }
};
//find a Tour
export const findTour = async (req, res) => {
    const id = req.params.id
    try {
        const findSingleTour = await Tour.findById(id);
        res.status(200).json({
            success: true,
            message: 'Tour details found',
            data: findSingleTour
        })

    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Can not find a Tour'
        })

    }
};
//find all Tours

export const findAllTours = async (req, res) => {

    //pagination

    const page = parseInt(req.query.page);
    try {
        const allTours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8);
        res.status(200).json({
            success: true,
            count: allTours.length,
            message: 'All Tours available',
            data: allTours
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No Tours available'
        })

    }
};

//Get a Tour from a search query

export const getTourBySearch = async (req, res) => {

    //case sensitive
    const city = new RegExp(req.query.city, 'i');
    const title = new RegExp(req.query.title, 'i');
    const distance = parseInt(req.query.distance);
    const rooms = parseInt(req.query.rooms);


    try {
        const TourSearch = await Tour.find({ city, title, distance: { $gte: distance }, rooms: { $gte: rooms } }).populate('reviews') 

        res.status(200).json({

            success: true,
            count: TourSearch.length,
            message: 'Search results',
            data: TourSearch
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No such Tour(S) found'
        })
    }
};


//get featured Tours

export const getFeauturedTour = async (req, res) => {

    try {
        const featuredTours = await Tour.find({ featured: true }).populate('reviews').limit(8);

        res.status(200).json({
            success: true,
            message: 'Featured Tours',
            data: featuredTours,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No Tours available'
        })

    }
};

export const getTourCounts = async (req, res) => {

    try {
        const TourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            message: 'Featured Tours',
            data: TourCount,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No Tours available'
        })

    }
};