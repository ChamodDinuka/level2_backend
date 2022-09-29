const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes/reservation')
const user = require('./routes/auth')
const connectDB = require('./db')
const cors = require('cors')

dotenv.config({path:'./config.env'})
connectDB();

const app = express();
app.use(express.json());
app.use(cors())
app.use('/',routes)
app.use('/',user)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT)

process.on('unhandledRejection',(err,promise)=>{
    server.close(()=>process.exit(1))
})