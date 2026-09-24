import userModel from "../models/user.model.js";
import messageModel from "../models/message.model.js";
import { hasImageKitConfig, uploadChatMedia } from "../lib/imageKit.js";



export async function getUsersForSideBar(req, res) {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-clerkId")

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.error("Erro in getUsersFromSideBar:", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function getConversationsForSideBar(req, res) {
    try {
        const loggedInUserId = req.user._id

        const conversations = await messageModel.aggregate([
            // 1. keeping only messages which i send or recived
            { $match: { $or: [{ senderID: loggedInUserId }, { receiverID: loggedInUserId }] } },

            // 2. Collapse them into one row per chat partener, noting our latest message time
            {
                $group: {
                    _id: { $cond: [{ $eq: ["$senderID", loggedInUserId] }, "$receiverID", "$senderID"] },
                    lastMessageAt: { $max: "$createdAt" },
                }
            },

            // 3. Put the most recent conversation on the top.
            { $sort: { lastMessageAt: -1 } },

            // 4. Look up each partner's user profile (come back as an array)
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },

            // 5. Pull that profile out of the array and make it the document.
            { $replaceRoot: { newRoot: { first: "$user" } } },

            // 6. Hide the private clerkId field from result.
            { $project: { clerkId: 0 } },
        ]);

        res.status(200).json(conversations)
    } catch (error) {
        console.error("Error in getConversationForSideBar:", error.message);
        res.status(500).json({
            messger: "Internal server error"
        })
    }
}

export async function getMessages(req, res) {
    try {
        const { id: userToChatId } = req.params
        const { myId } = req.user._id

        const message = await messageModel.find({
            $or: [{ senderID: myID, receiverID: userToChatId },
            { senderID: userToChatId, receiverID: myId }]
        }).sort({ createdAt: 1 }) // ascending order

        res.status(200).json(messages)

    } catch (error) {
        console.error("Error in getMessage:", error.message)
        res.status(500).json("Internal server error")
    }

}


export async function sendMessage(req, res) {
    try {
        const { text } = req.body
        const { id: receiverId } = req.params
        const { senderId } = req.user._id

        let imageurl;
        let videourl;

        if (req.file) {
            if (!hasImageKitConfig()) {
                return res.status(500).json({ message: "Media upload not configured" })
            }

            const url = await uploadChatMedia(req.file);
            if (req.file.mimetype.startsWith("video")) {
                videourl = url;
            }
            else {
                imageurl = url;
            }
        }

        const newMessage = await messageModel.create({
            senderID: senderId,
            receiverID: receiverId,
            content: text,
            image: imageurl,
            video: videourl
        })

        res.status(201).json(newMessage)

    } catch (error) {
        console.error("error in sendMessage:", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}