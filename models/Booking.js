import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: String,

        },
        userEmail: {
            type: String,
            required: true,

        },
        fullName: {
            type: String,
            required: true,
        },
        hotelName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },

        bookingDate: {
            type: Date,
            required: true,

        },
        timeOut: {
            type: Date,
            required: true,

        },
        guestNumber: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
