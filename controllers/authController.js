const user = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { use } = require('../routes/auth')

exports.registerUser = async (req, res, next) => {
    try {
        const result = await user.create(req.body)

        //create token
        const token = result.getsignedJwtToken()
        res.status(200).json({ success: true, token })
    } catch (error) {
        res.status(400).json({ success: false, error: 'Email is already existing' })
    }
}
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
     if (!email || !password) {
         res.status(400).json({ success: false, error: 'Email and password should not be empty' })
     }
    const result = await user.findOne({ email }).select('+password')

    if (!result) {
        return res.status(401).json({ success: false, error: 'Email and password are not valid' })
    }
    const isMatch = await result.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Email and password are not valid' })
    }
    //create token
    const token = result.getsignedJwtToken()
    res.status(200).json({ success: true, token })
}
exports.genToken = async(req,res,next)=>{
    const token = jwt.sign({data:req.body},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXP
    })
    res.status(200).json({ success: true, token })
}
exports.getUser = async (req,res,next)=>{
    try {
        const userList = await user.find();
        res.status(200).json(userList)
    } catch (error) {
        res.status(400).json({ success: false,error })
    }
}
exports.getCurrentUser = async (req,res,next)=>{
    try {
        const userList = await user.findById(req.params.id);
        res.status(200).json(userList)
    } catch (error) {
        res.status(400).json({ success: false,error })
    }
}
exports.resetPassword = async (req,res,next)=>{
    try {
        const userList = await user.findOne({ _id:req.params.id  });
        if(userList){
            userList.password = req.body.password
            await userList.save()
            res.status(200).json({ success: true })
        }else{
            res.status(400).json({ success: false })
        }
    } catch (error) {
        res.status(400).json({ success: false,error })
    }
}
exports.updateUser = async(req,res,next)=>{
    try {
        const result = await user.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!result) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })  
    } catch (error) {
        return res.status(400).json({ success: false,error:'Email is already exist'  })
    }
}
exports.deleteUser = async(req,res,next)=>{
    try {
        const result = await user.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
}
exports.checkUser = async (req,res,next)=>{
    try {
        const userList = await user.find(req.body);
        if(userList.length > 0){
            res.status(200).json(true)
        }else{
            res.status(200).json(false)
        }
        
    } catch (error) {
        res.status(400).json({ success: false,error })
    }
}