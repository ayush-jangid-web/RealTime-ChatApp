import 'dotenv/config'

import express  from 'express'
const app = express();
app.use(express.json());

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})

