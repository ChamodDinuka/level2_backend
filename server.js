const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes/reservation')
const connectDB = require('./db')

dotenv.config({path:'./config.env'})
connectDB();

const app = express();
app.use(express.json());

app.use('/',routes)
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, console.log(PORT))

process.on('unhandledRejection',(err,promise)=>{
    console.log(err.message)
    server.close(()=>process.exit(1))
})