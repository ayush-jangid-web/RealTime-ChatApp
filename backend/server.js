import "dotenv/config"
import express from 'express'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import dbconnect from './src/config/db.js';
import fs from 'fs'
import path from "path";
import job from "./src/lib/cron.js";
import clerkWebhook from './src/webhooks/clerk.webhook.js'
import authRouter from './src/routes/auth.route.js'

const app = express();
const publicdir = path.join(process.cwd(), "public");

app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(clerkMiddleware());


app.get("/health", (req, res) => {
    res.status(200).json({
        message: "server running",
        success: true
    })
})

app.use("/api/auth", authRouter)

if (fs.existsSync(publicdir)) {
    app.use(express.static(publicdir))
    app.get("/{*any}", (req, res, next) => {
        res.sendFile(path.join(publicdir, "index.html"), (err) => next(err))
    })
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    dbconnect()
    console.log(`server is running at http://localhost:${PORT}`)

    if (process.env.NODE_ENV === "production") {
        job.start()
    }
})

