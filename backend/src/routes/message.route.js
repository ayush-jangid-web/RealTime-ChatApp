import express from 'express'
import { getUsersForSideBar,getConversationsForSideBar, getMessages,sendMessage } from '../controllers/message.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'
import {upload} from '../middleware/upload.middleware.js'

const router = express.Router()

router.use(protectRoute)

// api/message  /users  (get all the users)
router.get("/users",getUsersForSideBar)

// api/message  /conversation  (get all the chats)
router.get("/conversation",getConversationsForSideBar)

// api/message  /:id  (get all the messages for perticular chat)
router.get("/:id",getMessages)

// api/message  /send/:id  (send message)
router.post("/send/:id",upload.single("media"),sendMessage)

export default router