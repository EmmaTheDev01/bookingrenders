import Car from "../models/Car.js";


export const createCar = async (req, res) => {
  const newCar = new Car(req.body);
  try {
      const savedCar = await newCar.save();
      res.status(200).json({
          success: true,
          message: "Car saved succesfully",
          data: savedCar
      });
  }
  catch (err) {
      res.status(500).json({
          success: false,
          message: 'Car not saved, try again'
      });
  }
};

//Updating Cars
export const updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "successfully updated Car",
      data: updatedCar,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Car not updated, try again",
    });
  }
};
// delete a Car
export const deleteCar = async (req, res) => {
  const id = req.params.id;
  try {
    await Car.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete Car",
    });
  }
};//find a Car
export const findCar = async (req, res) => {
  try {
    const findSingleCar = await Car.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Car details found",
      data: findSingleCar,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Can not find a Car",
    });
  }
};

//find all Cars
export const findAllCars = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const allCars = await Car.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    const count = await Car.countDocuments({});
    res.status(200).json({
      success: true,
      count,
      message: "All Cars available",
      data: allCars,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No Cars available",
    });
  }
};

// Get a Car from a search query
export const getCarBySearch = async (req, res) => {
  const { city, distance,title } = req.query;
  try {
    const CarSearch = await Car.find({
      city: { $regex: new RegExp(city, "i") },
      distance: { $gte: parseInt(distance) },
      title: { $regex: new RegExp(title, "i") },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      count: CarSearch.length,
      message: "Search results",
      data: CarSearch,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No such Cars found",
    });
  }
};

//get featured Cars

export const getFeauturedCar = async (req, res) => {
  try {
    const featuredCars = await Car.find({ featured: true })
      .populate("reviews")
      .limit(8);
    if (featuredCars.length > 0) {
      res.status(200).json({
        success: true,
        message: "Featured Cars",
        data: featuredCars,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Cars available",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};
//Count number of Cars on page
export const getCarCounts = async (req, res) => {
  try {
    const CarCount = await Car.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      message: "Featured Cars",
      data: CarCount,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No Cars available",
    });
  }
};
