const express = require('express')
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/authController')

router.post('/register',registerUser)
router.post('/login',loginUser)

// router.post('/login',(req,res)=>{
//     res.status(200).json({status:"success"})
// })

module.exports= router