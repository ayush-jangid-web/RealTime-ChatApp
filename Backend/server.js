import 'dotenv/config'

import express  from 'express'
import dbconnect from './src/config/db';
const app = express();
app.use(express.json());

const PORT = process.env.PORT

dbconnect

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})

