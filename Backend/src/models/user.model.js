import mongoose, { connection } from "mongoose";

const userschema = new mongoose.Schema({
    clerkID:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:""
    }
},{
    timestamps:true //creratedAt && updatedAt
})

const userModel = mongoose.model('User',userschema)

export default userModel