import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    model: {
      type: String,
      required: true,
    },
    
    condition: {
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
    price: {
      type: Number,
      required: true,
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
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);
