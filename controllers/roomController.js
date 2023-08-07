import Room from "../models/Room.js";
import Review from "../models/Review.js";


export const createRoom = async (req, res) => {
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        res.status(200).json({
            success: true,
            message: "Room saved succesfully",
            data: savedRoom
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Room not saved, try again'
        });
    }
};

//Updating Rooms 

export const updateRoom = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({
            success: true,
            message: "succesfully updated Room",
            data: updatedRoom
        });

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Room not deleted, try again'
        });

    }
};
//delete a Room
export const deleteRoom = async (req, res) => {
    const id = req.params.id
    try {
        await Room.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'You have deleted a Room succesfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete a Room'
        });

    }
};
//find a Room
export const findRoom = async (req, res) => {
    const id = req.params.id
    try {
        const findSingleRoom = await Room.findById(id);
        res.status(200).json({
            success: true,
            message: 'Room details found',
            data: findSingleRoom
        })

    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Can not find a Room'
        })

    }
};
//find all Rooms

export const findAllRooms = async (req, res) => {

    //pagination

    const page = parseInt(req.query.page);
    try {
        const allRooms = await Room.find({}).populate('reviews').skip(page * 8).limit(8);
        res.status(200).json({
            success: true,
            count: allRooms.length,
            message: 'All Rooms available',
            data: allRooms
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No Rooms available'
        })

    }
};

//Get a Room from a search query

export const getRoomBySearch = async (req, res) => {

    //case sensitive
    const city = new RegExp(req.query.city, 'i');
    const title = new RegExp(req.query.title, 'i');
    const distance = parseInt(req.query.distance);
    const rooms = parseInt(req.query.rooms);


    try {
        const RoomSearch = await Room.find({ city, title, distance: { $gte: distance }, rooms: { $gte: rooms } }).populate('reviews') 

        res.status(200).json({

            success: true,
            count: RoomSearch.length,
            message: 'Search results',
            data: RoomSearch
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No such Room(S) found'
        })
    }
};


//get featured Rooms

export const getFeauturedRoom = async (req, res) => {

    try {
        const featuredRooms = await Room.find({ featured: true }).populate('reviews').limit(8);

        res.status(200).json({
            success: true,
            message: 'Featured Rooms',
            data: featuredRooms,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No Rooms available'
        })

    }
};

export const getRoomCounts = async (req, res) => {

    try {
        const RoomCount = await Room.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            message: 'Featured Rooms',
            data: RoomCount,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'No Rooms available'
        })

    }
};