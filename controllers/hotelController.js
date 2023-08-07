import Hotel from "../models/Hotel.js";


export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
      const savedHotel = await newHotel.save();
      res.status(200).json({
          success: true,
          message: "Hotel saved succesfully",
          data: savedHotel
      });
  }
  catch (err) {
      res.status(500).json({
          success: false,
          message: 'Hotel not saved, try again!'
      });
  }
};

//Updating hotels
export const updateHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "successfully updated hotel",
      data: updatedHotel,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Hotel not updated, try again",
    });
  }
};
// delete a hotel
export const deleteHotel = async (req, res) => {
  const id = req.params.id;
  try {
    await Hotel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete hotel",
    });
  }
};//find a hotel
export const findHotel = async (req, res) => {
  try {
    const findSingleHotel = await Hotel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Hotel details found",
      data: findSingleHotel,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Can not find a hotel",
    });
  }
};

//find all hotels
export const findAllHotels = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const allHotels = await Hotel.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    const count = await Hotel.countDocuments({});
    res.status(200).json({
      success: true,
      count,
      message: "All hotels available",
      data: allHotels,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No hotels available",
    });
  }
};

// Get a hotel from a search query
export const getHotelBySearch = async (req, res) => {
  const { city, distance,title } = req.query;
  try {
    const hotelSearch = await Hotel.find({
      city: { $regex: new RegExp(city, "i") },
      distance: { $gte: parseInt(distance) },
      title: { $regex: new RegExp(title, "i") },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      count: hotelSearch.length,
      message: "Search results",
      data: hotelSearch,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No such hotels found",
    });
  }
};

//get featured hotels

export const getFeauturedHotel = async (req, res) => {
  try {
    const featuredHotels = await Hotel.find({ featured: true })
      .populate("reviews")
      .limit(8);
    if (featuredHotels.length > 0) {
      res.status(200).json({
        success: true,
        message: "Featured hotels",
        data: featuredHotels,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No hotels available",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};
//Count number of hotels on page
export const getHotelCounts = async (req, res) => {
  try {
    const hotelCount = await Hotel.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      message: "Featured hotels",
      data: hotelCount,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No hotels available",
    });
  }
};
