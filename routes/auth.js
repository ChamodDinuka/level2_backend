const express = require('express')
const router = express.Router();
const {registerUser,loginUser,genToken,getUser,updateUser,deleteUser} = require('../controllers/authController')

router.post('/register',registerUser)
router.post('/login',loginUser)

//user CRUD API's
router.route('/users').get(getUser)
router.route('/users/:id').put(updateUser).delete(deleteUser)


//get token for send email
router.route('/token').post(genToken)

// router.post('/login',(req,res)=>{
//     res.status(200).json({status:"success"})
// })

module.exports= router