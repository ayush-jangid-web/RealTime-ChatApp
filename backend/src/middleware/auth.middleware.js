import { getAuth } from "@clerk/express";
import userModel from "../models/user.model";

export async function protectRoute(req,res,next) {
    try {
        
        const {userId} = getAuth();

        if(!userId){
            res.status(401).json({message:"Unauthorizied"});
            return;
        }

        const user = await userModel.findOne({clerkId:userId})

        if(!user){
            res.status(404).json({message:"User profile not synced yet"});
            return;
        }

        req.user = user;

        next()

    } catch (error) {
        console.error("Error in protectedRoute middleware:",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}