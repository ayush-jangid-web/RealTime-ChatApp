import mongoose from "mongoose";

async function dbconnect(){
    try {

        if(!process.env.MONGO_URI){
            throw new Error("MONGO URI is required")
        }

        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to DB")
    } catch (error) {
        console.error("Mongodb connection error: ",error.message);
        process.exit(1)
        // 1 faild , 0 means success
    }
}

export default dbconnect;