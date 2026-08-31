import mongoose from "mongoose";

const userschema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }, // createdAt & updatedAt
);

const userModel = mongoose.model('User', userschema)

export default userModel