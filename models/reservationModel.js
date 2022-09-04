const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    client:{ type:String, required:true, trim:true},
    type:{ type:String, required:true, trim:true},
    date:{type:String, required:true, trim:true},
    time:{type:String, required:true, trim:true},
})
module.exports = mongoose.model('reservations',reservationSchema);