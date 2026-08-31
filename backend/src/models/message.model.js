import mongoose, { mongo } from "mongoose";

const messageschema = new mongoose.Schema({
    senderID:{
        type:mongoose.Schema.Types.ObjectId(),
        ref:"User",
        required:true
    },
    receiverID:{
        type:mongoose.Schema.Types.ObjectId(),
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    messagetype:{
        type:String,
        enum:["text","video","image"],
        default:"text"
    }
},{
    timestamps:true
})

const messageModel = mongoose.model("Message",messageschema)

export default messageModel