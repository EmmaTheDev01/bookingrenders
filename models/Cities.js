import mongoose from "mongoose";

const CitySchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        properties: {
            type: Number,
            default: 0,
            required: true,
    },
},
{ timestamps: true }
)
export default mongoose.model("City", CitySchema);