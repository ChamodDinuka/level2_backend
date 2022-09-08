const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
    type:{ type:String,trim:true}
})
module.exports = mongoose.model('types',typeSchema);