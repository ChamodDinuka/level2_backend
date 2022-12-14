const user = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { use } = require('../routes/auth')
const ErrorResponse = require('../utils/errorResponse')

exports.registerUser = async (req, res, next) => {
    try {
        const result = await user.create(req.body)

        //create token
        const token = result.getsignedJwtToken()
        res.status(200).json({ success: true, token })
    } catch (error) {
        //res.status(400).json({ success: false, error: 'Email is already existing' })
        next(new ErrorResponse('Email is already exist', 400))
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
        let userList=[]
        const page = parseInt(req.query.page, 10 || 1)
        const limit = parseInt(req.query.limit, 10 || 100)
        const skip = (page-1)*limit
        //const userList = await user.find().skip(skip).limit(limit) 
        if (req.query.sort) {
            let sortQuery = req.query.sort.split(',').join(' ')
            userList = await user.find().skip(skip).limit(limit).sort(sortQuery)
        } else {
            userList = await user.find().skip(skip).limit(limit)
        }
        res.status(200).json(userList)
    } catch (error) {
        next(new ErrorResponse())
       // res.status(400).json({ success: false,error })
    }
}
exports.getCurrentUser = async (req,res,next)=>{
    try {
        const userList = await user.findById(req.params.id);
        res.status(200).json(userList)
    } catch (error) {
        // res.status(400).json({ success: false,error })
        next(new ErrorResponse())
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
            //res.status(400).json({ success: false })
            throw new Error()
        }
    } catch (error) {
        next(new ErrorResponse(error.message || 'User could not found', 400))
        //res.status(400).json({ success: false,error })
    }
}
exports.updateUser = async(req,res,next)=>{
    try {
        const result = await user.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!result) {
            //return res.status(400).json({ success: false })
            throw new Error();
        }
        res.status(200).json({ success: true })  
    } catch (error) {
       // return res.status(400).json({ success: false,error:'Email is already exist'  })
       next(new ErrorResponse('Email is already exist', 400))
    }
}
exports.deleteUser = async(req,res,next)=>{
    try {
        const result = await user.findByIdAndDelete(req.params.id)
        if (!result) {
            throw new Error()
            //return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        //return res.status(400).json({ success: false })
        next(new ErrorResponse(error.message || 'There is no matching record to delete', 400))
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
        next(new ErrorResponse())
        //res.status(400).json({ success: false,error })
    }
}