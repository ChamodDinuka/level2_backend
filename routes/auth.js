const express = require('express')
const router = express.Router();
const {registerUser, resetPassword, loginUser, genToken, getCurrentUser, getUser, updateUser, deleteUser, checkUser} = require('../controllers/authController')

router.post('/register',registerUser)
router.post('/login',loginUser)

//user CRUD API's
router.route('/users').get(getUser)
router.route('/users/:id').put(updateUser).delete(deleteUser).get(getCurrentUser)
router.route('/check').post(checkUser)


//get token for send email
router.route('/token').post(genToken)

//reset password
router.route('/reset/:id').put(resetPassword)

// router.post('/login',(req,res)=>{
//     res.status(200).json({status:"success"})
// })

module.exports= router