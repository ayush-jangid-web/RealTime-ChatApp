import "dotenv/config"
import express  from 'express'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import dbconnect from './src/config/db.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","GET"],
    credentials:true
}));
app.use(clerkMiddleware());


app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"server running",
        success:true
    })
})

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})


const PORT = process.env.PORT
app.listen(PORT,()=>{
    dbconnect()
    console.log(`server is running at http://localhost:${PORT}`)
})

