const reservation = require('../models/reservationModel')

exports.getReservation = async (req, res, next) => {
    try {
        const result = await reservation.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
exports.addReservation = async (req, res, next) => {
    try {
        const result = await reservation.create(req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }

}
exports.updateReservation = async (req, res, next) => {
    try {
        const result = await reservation.findByIdAndUpdate(req.params.id, req.body, {
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
exports.deleteReservation = async (req, res, next) => {
    try {
        const result = await reservation.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
}
