const type = require('../models/typeModel')

exports.getType = async (req, res, next) => {
    try {
        const result = await type.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}