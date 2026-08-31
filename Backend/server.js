import "dotenv/config"
import express  from 'express'
import cors from 'cors'
import {clerkMiddleware} from '@clerk/express'
import dbconnect from './src/config/db.js';

import fs from 'fs'
import path from "path";

const app = express();

const publicdir = path.join(process.cwd(),"public");

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

if(fs.existsSync(publicdir)){

    app.use(express.static(publicdir))

    app.get("/{*any}",(req,res,next)=>{
        res.sendFile(path.join(publicdir, "index.html"),(err)=> next(err))
    })

}

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})


const PORT = process.env.PORT
app.listen(PORT,()=>{
    dbconnect()
    console.log(`server is running at http://localhost:${PORT}`)
})

