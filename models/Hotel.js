import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    street:{
      type: String,
      required: true,
    },
    country:{
      type: String,
      required:true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    avgRating:{
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    guestNumber: {
      type: Number,
      
    },
    rooms: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Room',
      }
    ],
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
    image_one:{
      type : String,
    },
    image_two:{
      type: String,
    },
    image_three:{
      type: String,
    },
    image_four:{
      type: String,
    },
    image_five:{
      type:String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
