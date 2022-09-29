const mongoose = require('mongoose')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName:{ type:String, required:true, trim:true},
    lastName:{ type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true, unique:true, match:[/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,'Email not valid']},
    joinDate:{type:String, required:true, trim:true},
    role:{type:String, enum:['admin','super_admin'], default:'admin'},
    password:{ type:String, required:true, select:false},
    key:String,
    resetToken:String,
    resetTokenExp:Date,
    createdDate:{type:Date, default:Date.now},
    count:{type:Number, default:0}
})
userSchema.pre('save',async function(next){
    const salt = await bcript.genSalt(10);
    this.password = await bcript.hash(this.password,salt)
})
userSchema.methods.getsignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXP
    })

}
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcript.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('users',userSchema);