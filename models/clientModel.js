const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    firstName:{ type:String, required:true, trim:true},
    lastName:{ type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true, unique:true, match:[/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,'Email not valid']},
    telephone:{type:String, required:true, trim:true, unique:true, maxlength:13},
    key:{type:String}
})
module.exports = mongoose.model('clients',clientSchema);