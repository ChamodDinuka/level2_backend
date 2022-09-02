const express = require('express')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const app = express();
const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(PORT))