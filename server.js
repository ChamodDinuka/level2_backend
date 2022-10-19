const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes/reservation')
const user = require('./routes/auth')
const connectDB = require('./db')
const cors = require('cors')
const errorHandler = require('./middleware/error')

dotenv.config({path:'./config.env'})
connectDB();

const app = express();
app.use(express.json());
app.use(cors())
app.use('/',routes)
app.use('/',user)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
const server = app.listen(PORT)

process.on('unhandledRejection',(err,promise)=>{
    server.close(()=>process.exit(1))
})