const client = require('../models/clientModel')

exports.getClients = async (req, res, next) => {
    try {
        const result = await client.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
exports.addClient = async (req, res, next) => {
    try {
        const result = await client.create(req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }

}
exports.updateClient = async (req, res, next) => {
    try {
        const result = await client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!result) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }

}
exports.deleteClient = async (req, res, next) => {
    try {
        const result = await client.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
}
