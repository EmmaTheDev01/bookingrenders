import Booking from "../models/Booking.js"

export const createBooking = async (req,res) =>{
    const newBooking = new Booking(req.body) 
    try{
       const savedBooking = await newBooking.save();
       res.status(200).json({
        success:true,
        message: 'Booking successful',
        data: savedBooking, 
       })

    }catch(err){
        res.status(500).json({
            success:false,
            message:'Booking failed',
        })
    }
};

//Get single booking details

export const getBooking = async(req, res) =>{
    const id = req.params.id
    try{
        const book = await Booking.findById(id)
        res.status(200).json({
            success:true,
            message:'Booking details',
            data: book,
        })
    }catch(err){
        res.status(404).json({
            success:false,
            message: 'No available booking data found',
        })
    }
};

//Get all boooking details

export const getAllBooking = async(req, res) =>{
    
    try{
        const allBooking = await Booking.find()
        res.status(200).json({
            success:true,
            message:'Booking details',
            data: allBooking,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message: 'No available booking data found',
        })
    }
}