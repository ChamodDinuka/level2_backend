const client = require('../models/clientModel')
const ErrorResponse = require('../utils/errorResponse')

exports.getClients = async (req, res, next) => {
    try {
        let result=[]
        const page = parseInt(req.query.page, 10 || 1)
        const limit = parseInt(req.query.limit, 10 || 100)
        const skip = (page - 1) * limit
        if (req.query.sort) {
            let sortQuery = req.query.sort.split(',').join(' ')
            result = await client.find().skip(skip).limit(limit).sort(sortQuery)
        } else {
            result = await client.find().skip(skip).limit(limit)
        }
        res.status(200).json(result)
    } catch (error) {
        next(new ErrorResponse())
    }
}
exports.addClient = async (req, res, next) => {
    try {
        const result = await client.create(req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        next(new ErrorResponse('Email is already exist', 400))
    }

}
exports.updateClient = async (req, res, next) => {
    try {
        const result = await client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!result) {
            throw new Error("Client not found")
        }
        res.status(200).json({ success: true })
    } catch (error) {
        next(new ErrorResponse(error.message, 400))
    }

}
exports.deleteClient = async (req, res, next) => {
    try {
        const result = await client.findByIdAndDelete(req.params.id)
        if (!result) {
            throw new Error("Client not found")
        }
        res.status(200).json({ success: true })
    } catch (error) {
        next(new ErrorResponse(error.message, 400))
    }
}
