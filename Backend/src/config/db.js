import mongoose from "mongoose";

const dbconnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to DB")
    } catch (error) {
        console.error(error);
    }
}

export default dbconnect;