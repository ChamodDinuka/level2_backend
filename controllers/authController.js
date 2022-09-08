const user = require('../models/userModel')

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