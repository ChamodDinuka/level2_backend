const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    client:{ type:String, required:true, trim:true},
    type:{ type:String, required:true, trim:true},
    date:{type:String, required:true, trim:true},
    time:{type:String, required:true, trim:true},
    status:{type:String, required:true, trim:true},
    clientName:{type:String,trim:true},
    typeName:{type:String,trim:true},
    key:{type:Number}
})
module.exports = mongoose.model('reservations',reservationSchema);