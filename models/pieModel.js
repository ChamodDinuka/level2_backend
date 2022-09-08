const mongoose = require('mongoose')

const pieSchema = new mongoose.Schema({
    type:{ type:String,trim:true},
    value:{type:Number}
})
module.exports = mongoose.model('pieCharts',pieSchema);